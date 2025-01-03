// src/store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommandOutput,
  ConfirmSignUpCommandOutput,
  InitiateAuthCommandOutput,
} from "@aws-sdk/client-cognito-identity-provider";
import { client, CLIENT_ID } from "@/config/aws-config";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  twoStepVerification: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isOtpRequired: boolean;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  isOtpRequired: false,
};

export const resendConfirmationCode = createAsyncThunk(
  "auth/resendConfirmationCode",
  async (email: string, { rejectWithValue }) => {
    try {
      const command = new ResendConfirmationCodeCommand({
        ClientId: CLIENT_ID,
        Username: email,
      });

      await client.send(command);
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to resend verification code. Please try again."
      );
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    userData: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const command = new SignUpCommand({
        ClientId: CLIENT_ID,
        Username: userData.email,
        Password: userData.password,
        UserAttributes: [
          {
            Name: "email",
            Value: userData.email,
          },
          {
            Name: "given_name",
            Value: userData.firstName,
          },
          {
            Name: "family_name",
            Value: userData.lastName,
          },
        ],
      });

      const response: SignUpCommandOutput = await client.send(command);

      return {
        isSignUpComplete: !response.UserConfirmed,
        nextStep: {
          signUpStep: response.UserConfirmed ? "DONE" : "CONFIRM_SIGN_UP",
        },
        userId: response.UserSub,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to create account. Please try again."
      );
    }
  }
);

export const confirmSignUp = createAsyncThunk(
  "auth/confirmSignUp",
  async (
    data: {
      email: string;
      code: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const command = new ConfirmSignUpCommand({
        ClientId: CLIENT_ID,
        Username: data.email,
        ConfirmationCode: data.code,
      });

      const response: ConfirmSignUpCommandOutput = await client.send(command);
      return { success: true };
    } catch (error: any) {
      return rejectWithValue(
        error.message || "Failed to verify email. Please try again."
      );
    }
  }
);
// Helper function to decode JWT token
const decodeToken = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (
    credentials: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const command = new InitiateAuthCommand({
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
          USERNAME: credentials.email,
          PASSWORD: credentials.password,
        },
      });

      const response: InitiateAuthCommandOutput = await client.send(command);

      if (!response.AuthenticationResult?.AccessToken) {
        throw new Error("No access token received");
      }

      // Decode the ID token to get user information
      const idTokenPayload = response.AuthenticationResult.IdToken
        ? decodeToken(response.AuthenticationResult.IdToken)
        : null;

      // Create a user object from the decoded token claims
      const user: User = {
        id: idTokenPayload?.sub || credentials.email,
        email: idTokenPayload?.email || credentials.email,
        firstName: idTokenPayload?.given_name || "",
        lastName: idTokenPayload?.family_name || "",
        role: idTokenPayload?.["custom:role"] || "user",
        twoStepVerification: false,
      };

      return {
        user,
        tokens: {
          accessToken: response.AuthenticationResult.AccessToken,
          refreshToken: response.AuthenticationResult.RefreshToken,
          idToken: response.AuthenticationResult.IdToken,
        },
      };
    } catch (error: any) {
      // Handle specific Cognito error cases
      if (error.name === "NotAuthorizedException") {
        return rejectWithValue("Incorrect email or password");
      }
      if (error.name === "UserNotFoundException") {
        return rejectWithValue("User does not exist");
      }
      if (error.name === "UserNotConfirmedException") {
        return rejectWithValue("UserNotConfirmedException");
      }
      if (error.name === "PasswordResetRequiredException") {
        return rejectWithValue(
          "Password reset required. Please reset your password"
        );
      }
      if (error.name === "TooManyRequestsException") {
        return rejectWithValue("Too many attempts. Please try again later");
      }

      return rejectWithValue(
        error.message || "Failed to sign in. Please try again."
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(clearCredentials());
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isOtpRequired = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.tokens.accessToken;
        localStorage.setItem("token", action.payload.tokens.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isOtpRequired = false;
      });
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
