
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

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const fullName = formData.get("fullName");
    const email = formData.get("email");
    const password = formData.get("password");
    const image = formData.get("image");

    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Image:", image);

    const { data, error } = await authClient.signUp.email({
      email: email,
      password: password,
      name: fullName,
      image: image,
    });

    console.log("Signup Response:", { data, error });

    if (error) {
      console.log("Signup Error:", error);
      alert(error.message || "Signup failed");
      return;
    }

    if (data) {
      alert("Account created successfully!");

      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-96 p-6">
        <Form
          className="flex w-full flex-col gap-4"
          onSubmit={onSubmit}
        >
          <h1 className="text-2xl font-bold">
            Create Account
          </h1>

          {/* Full Name */}
          <TextField
            isRequired
            name="fullName"
          >
            <Label>Full Name</Label>

            <Input
              placeholder="Enter your full name"
            />

            <FieldError />
          </TextField>

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
            minLength={8}
          >
            <Label>Password</Label>

            <Input
              placeholder="Enter your password"
            />

            <FieldError />
          </TextField>

          {/* Profile Image URL */}
          <TextField
            isRequired
            name="image"
            type="url"
          >
            <Label>Profile Image</Label>

            <Input
              placeholder="https://example.com/profile.jpg"
            />

            <FieldError />
          </TextField>

          {/* Submit */}
          <Button type="submit">
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;

