import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const AWS_REGION = "eu-west-3";
export const USER_POOL_ID = "eu-west-3_50twpNdPw";
export const CLIENT_ID = "5l0rh511q9kdjvuqmo1fodiuv9";

export const client = new CognitoIdentityProviderClient({
  region: AWS_REGION,
});
