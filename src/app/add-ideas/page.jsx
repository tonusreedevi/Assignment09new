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

const AddIdeas = () => {

   const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const idea = Object.fromEntries(formData.entries())


        const res = await fetch('http://localhost:5000/idea', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(idea)
        })

        const data = await res.json()


    }

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




    <main className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-600">
            IdeaVault
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Share Your Idea
          </h1>

          <p className="mt-3 max-w-2xl text-slate-500">
            Turn your idea into something others can discover, discuss, and
            build upon.
          </p>
        </div>


        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
          <form  onSubmit={onSubmit} className="p-6 md:p-10">

            <section className="mb-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Basic Information
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Start with the basic details of your idea.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Idea Title */}
                <div className="md:col-span-2">
                  <TextField name="title" isRequired className="flex flex-col gap-2">
                    <Label className="text-sm font-medium text-slate-700">
                      Idea Title
                    </Label>

                    <Input
                      placeholder="e.g. AI-powered study assistant"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />

                    <FieldError className="text-sm text-red-500" />
                  </TextField>
                </div>

                {/* Short Description */}
                <div className="md:col-span-2">
                  <TextField
                    name="shortDescription"
                    isRequired
                    className="flex flex-col gap-2"
                  >
                    <Label className="text-sm font-medium text-slate-700">
                      Short Description
                    </Label>

                    <TextArea
                      placeholder="Describe your idea in one or two sentences..."
                      rows={3}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                    />

                    <FieldError className="text-sm text-red-500" />
                  </TextField>
                </div>

                {/* Category */}
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Category
                  </Label>

                  <Select
                    name="category"
                    isRequired
                    className="relative"
                  >
                    <Button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-left text-sm text-slate-700 outline-none transition hover:bg-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100">
                      <span>
                        Select a category
                      </span>

                      <span className="text-slate-400">
                        ▾
                      </span>
                    </Button>

                    <Popover className="z-50 mt-2 w-[--trigger-width] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                      <ListBox className="max-h-64 overflow-auto p-1">
                        {categories.map((category) => (
                          <ListBoxItem
                            key={category}
                            id={category}
                            className="cursor-pointer rounded-lg px-3 py-2 text-sm text-slate-700 outline-none hover:bg-cyan-50 hover:text-cyan-700"
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
                  <Label className="text-sm font-medium text-slate-700">
                    Tags
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </Label>

                  <Input
                    placeholder="AI, productivity, students"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <p className="text-xs text-slate-400">
                    Separate multiple tags with commas.
                  </p>
                </TextField>

              </div>
            </section>

            {/* Idea Details */}
            <section className="mb-10 border-t border-slate-100 pt-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Idea Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Explain the problem and how your idea solves it.
                </p>
              </div>

              <div className="space-y-6">

                {/* Problem Statement */}
                <TextField
                  name="problemStatement"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Problem Statement
                  </Label>

                  <TextArea
                    placeholder="What problem are you trying to solve?"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Proposed Solution */}
                <TextField
                  name="proposedSolution"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Proposed Solution
                  </Label>

                  <TextArea
                    placeholder="How does your idea solve the problem?"
                    rows={5}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Detailed Description */}
                <TextField
                  name="detailedDescription"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Detailed Description
                  </Label>

                  <TextArea
                    placeholder="Tell the IdeaVault community more about your idea, how it works, and what makes it valuable..."
                    rows={7}
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

              </div>
            </section>

            {/* Audience & Resources */}
            <section className="mb-10 border-t border-slate-100 pt-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Audience & Resources
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Help others understand who your idea is for and what it may
                  require.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Target Audience */}
                <TextField
                  name="targetAudience"
                  isRequired
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Target Audience
                  </Label>

                  <Input
                    placeholder="e.g. University students"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <FieldError className="text-sm text-red-500" />
                </TextField>

                {/* Estimated Budget */}
                <TextField
                  name="estimatedBudget"
                  type="number"
                  className="flex flex-col gap-2"
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Estimated Budget
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      (Optional)
                    </span>
                  </Label>

                  <Input
                    type="number"
                    placeholder="e.g. 5000"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                  />

                  <p className="text-xs text-slate-400">
                    Enter the approximate budget required to build the idea.
                  </p>
                </TextField>

              </div>
            </section>

            {/* Image */}
            <section className="mb-10 border-t border-slate-100 pt-10">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Visual
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Add an image that represents your idea.
                </p>
              </div>

              <TextField
                name="imageUrl"
                isRequired
                className="flex flex-col gap-2"
              >
                <Label className="text-sm font-medium text-slate-700">
                  Image URL
                </Label>

                <Input
                  type="url"
                  placeholder="https://example.com/your-idea-image.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
                />

                <FieldError className="text-sm text-red-500" />
              </TextField>
            </section>

            {/* Submit */}
            <div className="border-t border-slate-100 pt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-700">
                    Ready to share your idea?
                  </p>

                  <p className="text-xs text-slate-400">
                    Make sure your information is accurate before submitting.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="rounded-xl bg-cyan-600 px-8 py-3 font-medium text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  Add Idea
                </Button>

              </div>
            </div>

          </form>
        </div>
      </div>
    </main>
  );
};

export default AddIdeas;

