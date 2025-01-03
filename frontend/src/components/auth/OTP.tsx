import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  confirmSignUp,
  resendConfirmationCode,
} from "@/store/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const FormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const OTP = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!email) {
      toast.error("Email address is missing. Please try signing up again.");
      navigate("/signup");
      return;
    }

    try {
      const resultAction = await dispatch(
        confirmSignUp({
          email,
          code: data.otp,
        })
      );

      if (confirmSignUp.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }

      toast.success("Email verified successfully! Please log in to continue.");
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to verify email. Please try again.");
      }
      console.error("Verification failed:", error);
    }
  }

  const handleResend = async () => {
    if (!email) {
      toast.error("Email address is missing. Please try signing up again.");
      navigate("/signup");
      return;
    }

    try {
      const resultAction = await dispatch(resendConfirmationCode(email));

      if (resendConfirmationCode.rejected.match(resultAction)) {
        throw new Error(resultAction.payload as string);
      }

      toast.success("Verification code resent successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to resend code. Please try again.");
      }
      console.error("Resend failed:", error);
    }
  };

  if (!email) {
    return null; // Or redirect to signup
  }

  return (
    <div className="h-full flex justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 flex flex-col border border-white/25 bg-white justify-center shadow-md mt-20 rounded-lg p-6 min-w-72 dark:bg-black"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verify your email</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={1} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={2} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={3} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={4} className="w-10 h-10 text-2xl" />
                      <InputOTPSlot index={5} className="w-10 h-10 text-2xl" />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the verification code sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button disabled={loading} type="submit" className="flex gap-1">
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Verifying..." : "Verify Email"}
          </Button>
          <button
            type="button"
            onClick={handleResend}
            className="hover:underline ml-auto text-sm"
            disabled={loading}
          >
            Resend code
          </button>
        </form>
      </Form>
    </div>
  );
};

export default OTP;
