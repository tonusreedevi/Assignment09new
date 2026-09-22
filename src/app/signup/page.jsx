"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";

import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: fullName,
      image: image,
    });

    if (error) {
      alert(error.message || "Signup failed");
      return;
    }

    if (data) {
      alert("Account created successfully!");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white border border-slate-200 shadow-sm overflow-hidden">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex relative bg-slate-950 p-12 xl:p-16 flex-col justify-between overflow-hidden">

          {/* Decorative Elements */}
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#88BDF2]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-[#4A90E2]/20 blur-3xl" />

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


          {/* Main Message */}
          <div className="relative z-10 max-w-lg">

            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-[#88BDF2]">
              Join IdeaVault
            </p>

            <h2 className="text-5xl xl:text-6xl font-semibold leading-[1.05] tracking-tight text-white">
              Your next
              <br />
              <span className="text-[#88BDF2]">
                idea starts here.
              </span>
            </h2>

            <p className="mt-7 max-w-md leading-7 text-slate-400">
              Create your account and become part of a space where ideas
              can be shared, explored, and discussed.
            </p>

          </div>


          {/* Bottom */}
          <div className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Share</span>

            <span className="h-1 w-1 rounded-full bg-[#88BDF2]" />

            <span>Discover</span>

            <span className="h-1 w-1 rounded-full bg-[#88BDF2]" />

            <span>Interact</span>
          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center p-7 sm:p-12 lg:p-14">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-9 lg:hidden">
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
            <div className="mb-8">

              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-[#4A90E2]">
                Create Account
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-950">
                Start sharing.
              </h1>

              <p className="mt-3 text-slate-500">
                Create your IdeaVault account and bring your ideas into
                the conversation.
              </p>

            </div>


            {/* Form */}
            <Form
              className="flex w-full flex-col gap-5"
              onSubmit={onSubmit}
            >

              {/* Full Name */}
              <TextField
                isRequired
                name="fullName"
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  Full Name
                </Label>

                <Input
                  placeholder="Enter your full name"
                  className="mt-2 h-12 border-slate-300 bg-[#FAF9F6] px-4 text-slate-950 outline-none transition focus:border-[#88BDF2]"
                />

                <FieldError />
              </TextField>


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
                minLength={8}
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  Password
                </Label>

                <Input
                  placeholder="Create a password"
                  className="mt-2 h-12 border-slate-300 bg-[#FAF9F6] px-4 text-slate-950 outline-none transition focus:border-[#88BDF2]"
                />

                <FieldError />
              </TextField>


              {/* Profile Image */}
              <TextField
                isRequired
                name="image"
                type="url"
                className="w-full"
              >
                <Label className="text-sm font-medium text-slate-700">
                  Profile Image URL
                </Label>

                <Input
                  placeholder="https://example.com/profile.jpg"
                  className="mt-2 h-12 border-slate-300 bg-[#FAF9F6] px-4 text-slate-950 outline-none transition focus:border-[#88BDF2]"
                />

                <FieldError />
              </TextField>


              {/* Submit */}
              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-none bg-[#4A90E2] text-sm font-semibold text-white transition hover:bg-[#88BDF2] hover:text-slate-950"
              >
                Create Account

                <span className="ml-2 text-lg">
                  →
                </span>
              </Button>

            </Form>


            {/* Login */}
            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Already have an account?
              </p>

              <button
                type="button"
                onClick={() => router.push("/login")}
                className="mt-2 text-sm font-semibold text-[#4A90E2] transition hover:text-slate-950"
              >
                Sign in to IdeaVault →
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SignUpPage;