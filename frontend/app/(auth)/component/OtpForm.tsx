import React, { useState } from "react";
import otpSchema from "@/schema/otpSchema";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TbLockPassword } from "react-icons/tb";
import Button from "./ui/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/(auth)/component/ui/input-otp";
import { z } from "zod";
import { useAuth } from "@/hooks/useAuth";

type OtpFormData = z.infer<typeof otpSchema>;

const OtpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { verifyEmail } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<OtpFormData> = async (data) => {
    try {
      setIsLoading(true);
      setError(null);

      const userId = localStorage.getItem("verifyUserId");
      if (!userId) {
        setError("Verification session expired. Please sign up again.");
        return;
      }
      // verifyEmail(): also:
      // - stores accessToken
      // - sets user
      // - redirects to /dashboard
      await verifyEmail({
        userId,
        otp: data.otp,
      });
    } catch (err) {
      console.error("login error:" + err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 md:p-10 w-full
            rounded-bl-lg rounded-br-lg
            md:rounded-bl-none md:rounded-tr-lg
            bg-black border-gray border-r border-t border-b"
    >
      <div className="mb-6">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
            Verify Your Email
          </h2>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed">
            We&apos;ve sent a one-time password to your email.
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            Please enter the 6-digit code below to complete your registration.
          </p>
        </div>

        <div className="text-gray-400 text-sm flex items-center gap-1 pl-1 mb-3">
          <TbLockPassword className="text-lg" />
          <span>Enter OTP</span>
        </div>

        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
              className="gap-1 sm:gap-2"
            >
              <InputOTPGroup className="gap-1 sm:gap-2">
                <InputOTPSlot
                  index={0}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
                <InputOTPSlot
                  index={1}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
                <InputOTPSlot
                  index={2}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
                <InputOTPSlot
                  index={3}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
                <InputOTPSlot
                  index={4}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
                <InputOTPSlot
                  index={5}
                  className="bg-gray-800 border-gray-600 text-white 
                             w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 
                             text-lg sm:text-xl md:text-2xl
                             focus:border-gray-400 focus:ring-2 focus:ring-gray-500"
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.otp && (
          <p className="text-red-500 text-sm mt-2">{errors.otp.message}</p>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      <div className="w-55">
        <Button buttonMessage={isLoading ? "Verifying..." : "Register"} />
      </div>
    </form>
  );
};

export default OtpForm;
