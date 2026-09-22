"use client";

import React from "react";
import {
  TextField,
  Label,
  Input,
  TextArea,
  FieldError,
  Select,
  Button,
  ListBox,
  ListBoxItem,
  Popover,
} from "react-aria-components";

import { authClient } from "@/lib/auth-client";

const AddIdeas = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const idea = {
      ...Object.fromEntries(formData.entries()),

      userId: user.id,
      userName: user.name,
      userImage: user.image || "",
    };

    console.log("Idea being submitted:", idea);

    try {
      const res = await fetch("http://localhost:5000/idea", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(idea),
      });

      const data = await res.json();

      console.log("Server response:", data);

      if (res.ok) {
        alert("Idea added successfully!");
        e.currentTarget.reset();
      } else {
        alert(data.message || "Failed to add idea");
      }
    } catch (error) {
      console.error("Error adding idea:", error);
      alert("Something went wrong!");
    }
  };

  const categories = [
    "Tech",
    "AI",
    "Health",
    "Education",
    "Finance",
    "Environment",
    "E-commerce",
    "Social",
    "Entertainment",
    "Other",
  ];

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-black">

      {/* ================= HERO ================= */}
      <section className="border-b border-black bg-black text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">

          <div className="mb-6 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-white" />

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-gray-400">
              IdeaVault / Create
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Share an idea.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
              Put your idea into words, explain the problem behind it, and
              give the community something worth discussing.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-gray-300">
              New Idea
            </span>

            <span className="border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-gray-300">
              Community
            </span>

            <span className="border border-white/20 px-4 py-2 text-xs uppercase tracking-wider text-gray-300">
              Innovation
            </span>
          </div>

        </div>
      </section>

      {/* ================= FORM ================= */}
      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">

        <form
          onSubmit={onSubmit}
          className="overflow-hidden border border-black bg-white"
        >

          {/* ================= BASIC INFORMATION ================= */}
          <section className="border-b border-black">

            <div className="grid md:grid-cols-[240px_1fr]">

              <div className="border-b border-black bg-[#f1f1ef] p-6 md:border-b-0 md:border-r">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  01
                </span>

                <h2 className="mt-3 text-xl font-semibold">
                  Basic Information
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Start with the core information that introduces your idea.
                </p>
              </div>

              <div className="space-y-7 p-6 md:p-10">

                {/* Title */}
                <TextField
                  name="title"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Idea Title
                  </Label>

                  <Input
                    placeholder="e.g. AI-powered study assistant"
                    className="w-full border-b border-gray-300 bg-transparent px-0 py-3 text-lg outline-none transition placeholder:text-gray-300 focus:border-black"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Short Description */}
                <TextField
                  name="shortDescription"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Short Description
                  </Label>

                  <TextArea
                    placeholder="Describe your idea in one or two sentences..."
                    rows={3}
                    className="w-full resize-none rounded-none border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                <div className="grid gap-7 md:grid-cols-2">

                  {/* Category */}
                  <div className="flex flex-col gap-2">

                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Category
                    </Label>

                    <Select
                      name="category"
                      isRequired
                      className="relative"
                    >
                      <Button className="flex w-full items-center justify-between border border-gray-200 bg-[#fafafa] px-4 py-3 text-left text-sm outline-none transition hover:bg-white focus:border-black">
                        <span>Select a category</span>
                        <span className="text-gray-400">↓</span>
                      </Button>

                      <Popover className="z-50 mt-2 w-[--trigger-width] overflow-hidden border border-black bg-white shadow-xl">
                        <ListBox className="max-h-64 overflow-auto p-1">
                          {categories.map((category) => (
                            <ListBoxItem
                              key={category}
                              id={category}
                              className="cursor-pointer px-3 py-2.5 text-sm outline-none hover:bg-black hover:text-white"
                            >
                              {category}
                            </ListBoxItem>
                          ))}
                        </ListBox>
                      </Popover>
                    </Select>

                  </div>

                  {/* Tags */}
                  <TextField
                    name="tags"
                    className="flex flex-col gap-2"
                  >
                    <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                      Tags
                      <span className="ml-2 font-normal text-gray-400">
                        Optional
                      </span>
                    </Label>

                    <Input
                      placeholder="AI, productivity, students"
                      className="w-full border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                    />

                    <p className="text-xs text-gray-400">
                      Separate multiple tags with commas.
                    </p>
                  </TextField>

                </div>

              </div>
            </div>
          </section>

          {/* ================= IDEA DETAILS ================= */}
          <section className="border-b border-black">

            <div className="grid md:grid-cols-[240px_1fr]">

              <div className="border-b border-black bg-[#f1f1ef] p-6 md:border-b-0 md:border-r">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  02
                </span>

                <h2 className="mt-3 text-xl font-semibold">
                  Idea Details
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Explain the problem, solution, and overall concept.
                </p>
              </div>

              <div className="space-y-7 p-6 md:p-10">

                {/* Problem */}
                <TextField
                  name="problemStatement"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Problem Statement
                  </Label>

                  <TextArea
                    placeholder="What problem are you trying to solve?"
                    rows={5}
                    className="w-full resize-none border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Solution */}
                <TextField
                  name="proposedSolution"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Proposed Solution
                  </Label>

                  <TextArea
                    placeholder="How does your idea solve the problem?"
                    rows={5}
                    className="w-full resize-none border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Detailed Description */}
                <TextField
                  name="detailedDescription"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Detailed Description
                  </Label>

                  <TextArea
                    placeholder="Tell the IdeaVault community more about your idea, how it works, and what makes it valuable..."
                    rows={7}
                    className="w-full resize-none border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

              </div>
            </div>
          </section>

          {/* ================= AUDIENCE ================= */}
          <section className="border-b border-black">

            <div className="grid md:grid-cols-[240px_1fr]">

              <div className="border-b border-black bg-[#f1f1ef] p-6 md:border-b-0 md:border-r">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  03
                </span>

                <h2 className="mt-3 text-xl font-semibold">
                  Audience & Resources
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Define who your idea is for and what it may require.
                </p>
              </div>

              <div className="grid gap-7 p-6 md:grid-cols-2 md:p-10">

                {/* Target Audience */}
                <TextField
                  name="targetAudience"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Target Audience
                  </Label>

                  <Input
                    placeholder="e.g. University students"
                    className="w-full border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Budget */}
                <TextField
                  name="estimatedBudget"
                  type="number"
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Estimated Budget
                    <span className="ml-2 font-normal text-gray-400">
                      Optional
                    </span>
                  </Label>

                  <Input
                    type="number"
                    placeholder="e.g. 5000"
                    className="w-full border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <p className="text-xs text-gray-400">
                    Approximate budget required to build the idea.
                  </p>
                </TextField>

              </div>
            </div>
          </section>

          {/* ================= IMAGE ================= */}
          <section className="border-b border-black">

            <div className="grid md:grid-cols-[240px_1fr]">

              <div className="border-b border-black bg-[#f1f1ef] p-6 md:border-b-0 md:border-r">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                  04
                </span>

                <h2 className="mt-3 text-xl font-semibold">
                  Visual
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Add a visual representation of your idea.
                </p>
              </div>

              <div className="p-6 md:p-10">

                <TextField
                  name="imageUrl"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                    Image URL
                  </Label>

                  <Input
                    type="url"
                    placeholder="https://example.com/your-idea-image.jpg"
                    className="w-full border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

              </div>
            </div>
          </section>

          {/* ================= SUBMIT ================= */}
          <div className="flex flex-col gap-6 bg-black p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">

            <div>
              <p className="text-sm font-medium">
                Ready to share your idea?
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Review your information before publishing.
              </p>
            </div>

            <Button
              type="submit"
              className="group flex items-center justify-center gap-4 bg-white px-8 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 focus:outline-none"
            >
              Add Idea

              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Button>

          </div>

        </form>

        {/* Bottom note */}
        <div className="mt-6 flex items-center justify-between text-xs text-gray-400">
          <span>IDEAVAULT</span>
          <span>CREATE • SHARE • DISCOVER</span>
        </div>

      </div>
    </main>
  );
};

export default AddIdeas;

