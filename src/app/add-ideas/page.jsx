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
  

  <main className="min-h-screen bg-[#f7f7f7] px-4 py-10 text-black md:px-8">
    <div className="mx-auto max-w-4xl">

      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-gray-500">
          IdeaVault
        </p>

        <h1 className="text-3xl font-bold md:text-4xl">
          Add a New Idea
        </h1>

        <p className="mt-2 max-w-xl text-sm text-gray-500">
          Share your idea with the community and let others discover it.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      >

        {/* Basic Information */}
        <section className="border-b border-gray-200 p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Basic Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Give your idea a clear identity.
            </p>
          </div>

          <div className="space-y-5">

            <TextField
              name="title"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Idea Title
              </Label>

              <Input
                placeholder="Enter your idea title"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            <TextField
              name="shortDescription"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Short Description
              </Label>

              <TextArea
                placeholder="Briefly describe your idea..."
                rows={3}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            <div className="grid gap-5 md:grid-cols-2">

              <div className="flex flex-col gap-2">
                <Label className="text-sm font-medium">
                  Category
                </Label>

                <Select
                  name="category"
                  isRequired
                  className="relative"
                >
                  <Button className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-3 text-left text-sm outline-none focus:border-black">
                    <span>Select category</span>
                    <span className="text-gray-400">⌄</span>
                  </Button>

                  <Popover className="z-50 mt-2 w-[--trigger-width] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                    <ListBox className="max-h-64 overflow-auto p-1">
                      {categories.map((category) => (
                        <ListBoxItem
                          key={category}
                          id={category}
                          className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none hover:bg-gray-100"
                        >
                          {category}
                        </ListBoxItem>
                      ))}
                    </ListBox>
                  </Popover>
                </Select>
              </div>

              <TextField
                name="tags"
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-medium">
                  Tags
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    Optional
                  </span>
                </Label>

                <Input
                  placeholder="AI, education, productivity"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
                />

                <p className="text-xs text-gray-400">
                  Separate tags with commas.
                </p>
              </TextField>

            </div>
          </div>
        </section>


        {/* Idea Details */}
        <section className="border-b border-gray-200 p-6 md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Idea Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explain the problem and your proposed solution.
            </p>
          </div>

          <div className="space-y-5">

            <TextField
              name="problemStatement"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Problem Statement
              </Label>

              <TextArea
                placeholder="What problem are you trying to solve?"
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            <TextField
              name="proposedSolution"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Proposed Solution
              </Label>

              <TextArea
                placeholder="How will your idea solve the problem?"
                rows={4}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            <TextField
              name="detailedDescription"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Detailed Description
              </Label>

              <TextArea
                placeholder="Explain how your idea works and why it is valuable..."
                rows={6}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

          </div>
        </section>


        {/* Audience & Resources */}
        <section className="border-b border-gray-200 p-6 md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Audience & Resources
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Tell us who your idea is for and what it may require.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <TextField
              name="targetAudience"
              isRequired
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Target Audience
              </Label>

              <Input
                placeholder="e.g. University students"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <FieldError className="text-sm text-red-500" />
            </TextField>

            <TextField
              name="estimatedBudget"
              type="number"
              className="flex flex-col gap-2"
            >
              <Label className="text-sm font-medium">
                Estimated Budget
                <span className="ml-2 text-xs font-normal text-gray-400">
                  Optional
                </span>
              </Label>

              <Input
                type="number"
                placeholder="e.g. 5000"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
              />

              <p className="text-xs text-gray-400">
                Approximate budget required.
              </p>
            </TextField>

          </div>
        </section>


        {/* Image */}
        <section className="border-b border-gray-200 p-6 md:p-8">

          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Idea Image
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Add an image that represents your idea.
            </p>
          </div>

          <TextField
            name="imageUrl"
            isRequired
            className="flex flex-col gap-2"
          >
            <Label className="text-sm font-medium">
              Image URL
            </Label>

            <Input
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-black focus:ring-1 focus:ring-black"
            />

            <FieldError className="text-sm text-red-500" />
          </TextField>

        </section>


        {/* Submit */}
        <div className="flex flex-col gap-4 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between md:px-8">

          <div>
            <p className="text-sm font-medium">
              Ready to share your idea?
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Make sure all required fields are completed.
            </p>
          </div>

          <Button
            type="submit"
            className="rounded-lg bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none"
          >
            Add Idea
          </Button>

        </div>

      </form>

      <p className="mt-5 text-center text-xs text-gray-400">
        IdeaVault • Create • Share • Discover
      </p>

    </div>
  </main>
);



};

export default AddIdeas;

