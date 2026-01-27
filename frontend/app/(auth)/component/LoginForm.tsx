import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Link from "next/link";
import Input from "@/app/(auth)/component/ui/Input";
import Button from "@/app/(auth)/component/ui/Button";
import z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "@/schema/loginSchema";
import { useAuth } from "@/hooks/useAuth";

type loginSchemaDataType = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const { login, isLoading, error, clearError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchemaDataType>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<loginSchemaDataType> = async (data) => {
    try {
      clearError();
      await login(data);
    } catch (err) {
      console.error("login error:" + err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-5 md:p-10 w-full
            rounded-bl-lg rounded-br-lg
            md:rounded-bl-none md:rounded-tr-lg
            bg-black border-gray border-r border-t border-b "
    >
      <h2 className="pb-4 text-xl text-white flex gap-2 items-center">
        <FaUser size={14} />
        Login
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm">
          {error}
        </div>
      )}

      <div className="mb-3">
        <div className="text-gray-400 text-sm flex items-center gap-1 pl-1">
          <MdEmail />
          Email
        </div>
        <Input
          placeholder="Enter your email"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-4">
        <div className="text-gray-400 text-sm flex items-center gap-1 pl-1">
          <RiLockPasswordFill />
          Password
        </div>
        <Input
          placeholder="Enter your password"
          type="password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <Button buttonMessage={isLoading ? "Logging in..." : "Log in"} />

      <p className="text-sm md:text-base text-center mt-3 text-white">
        Don&apos;t an account yet?{" "}
        <span className="underline cursor-pointer hover:text-hover transition-colors">
          <Link href="/signup">Create account</Link>
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
