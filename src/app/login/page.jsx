
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

    console.log("Email:", email);
    console.log("Password:", password);

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    console.log("Login Response:", { data, error });

    if (error) {
      console.log("Login Error:", error);
      alert(error.message || "Login failed");
      return;
    }

    if (data) {
      alert("Login successful!");

      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-96 p-6 shadow-lg">
        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={onSubmit}
        >
          <div className="mb-2 text-center">
            <h1 className="text-2xl font-bold">
              Welcome Back
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Login to your account
            </p>
          </div>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
          >
            <Label>Email</Label>

            <Input
              placeholder="john@example.com"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
          >
            <Label>Password</Label>

            <Input
              placeholder="Enter your password"
            />

            <FieldError />
          </TextField>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

