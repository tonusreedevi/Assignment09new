"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      alert(error.message || "Login failed");
      return;
    }

    if (data) {
      alert("Login successful!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white border border-slate-200 shadow-sm overflow-hidden">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex relative bg-slate-950 p-12 xl:p-16 flex-col justify-between overflow-hidden">

          {/* Decorative shapes */}
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-[#88BDF2]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#4A90E2]/20 blur-3xl" />

          {/* Logo */}
          <div className="relative z-10">
            <p className="text-[26px] font-semibold tracking-[-0.05em] text-white">
              Idea
              <span className="font-black text-[#88BDF2]">
                Vault
              </span>
              <span className="ml-1 text-[#4A90E2]">
                .
              </span>
            </p>
          </div>

          {/* Main Content */}
          <div className="relative z-10 max-w-lg">

            <p className="text-xs uppercase tracking-[0.3em] text-[#88BDF2] mb-6">
              Welcome Back
            </p>

            <h2 className="text-5xl xl:text-6xl font-semibold text-white leading-[1.05] tracking-tight">
              Your ideas are
              <br />
              <span className="text-[#88BDF2]">
                waiting.
              </span>
            </h2>

            <p className="mt-7 text-slate-400 leading-7 max-w-md">
              Continue exploring ideas, sharing your thoughts, and
              connecting with different perspectives on IdeaVault.
            </p>

          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Share</span>
            <span className="w-1 h-1 rounded-full bg-[#88BDF2]" />
            <span>Discover</span>
            <span className="w-1 h-1 rounded-full bg-[#88BDF2]" />
            <span>Interact</span>
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center p-7 sm:p-12 lg:p-16">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="lg:hidden mb-10">
              <p className="text-[24px] font-semibold tracking-[-0.05em] text-slate-950">
                Idea
                <span className="font-black text-[#4A90E2]">
                  Vault
                </span>
                <span className="ml-1 text-[#88BDF2]">
                  .
                </span>
              </p>
            </div>


            {/* Heading */}
            <div className="mb-9">

              <p className="text-xs uppercase tracking-[0.25em] text-[#4A90E2] mb-4">
                Account Access
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950">
                Welcome back.
              </h1>

              <p className="mt-3 text-slate-500">
                Sign in to continue to your IdeaVault account.
              </p>

            </div>


            {/* Form */}
            <Form
              className="flex w-full flex-col gap-6"
              onSubmit={onSubmit}
            >

              {/* Email */}
              <TextField
                isRequired
                name="email"
                type="email"
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  Email
                </Label>

                <Input
                  placeholder="you@example.com"
                  className="mt-2 h-12 border-slate-300 bg-[#FAF9F6] px-4 text-slate-950 outline-none transition focus:border-[#88BDF2]"
                />

                <FieldError />
              </TextField>


              {/* Password */}
              <TextField
                isRequired
                name="password"
                type="password"
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-slate-700">
                    Password
                  </Label>
                </div>

                <Input
                  placeholder="Enter your password"
                  className="mt-2 h-12 border-slate-300 bg-[#FAF9F6] px-4 text-slate-950 outline-none transition focus:border-[#88BDF2]"
                />

                <FieldError />
              </TextField>


              {/* Login Button */}
              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-none bg-slate-950 text-sm font-semibold text-white transition hover:bg-[#88BDF2] hover:text-slate-950"
              >
                Sign In
                <span className="ml-2 text-lg">
                  →
                </span>
              </Button>

            </Form>


            {/* Bottom Message */}
            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="mt-2 text-sm font-semibold text-[#4A90E2] hover:text-slate-950 transition"
              >
                Create your IdeaVault account →
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;