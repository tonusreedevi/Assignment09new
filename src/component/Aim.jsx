"use client";

import React, { useState } from "react";

const Aim = () => {
  const [activeGoal, setActiveGoal] = useState(null);

  const goals = [
    {
      id: 1,
      number: "01",
      title: "Share Ideas",
      description:
        "Give people a simple place to publish and organize their ideas.",
      details:
        "Users can present their thoughts, concepts, and solutions in a structured way so others can discover and understand them.",
    },
    {
      id: 2,
      number: "02",
      title: "Discover",
      description:
        "Make it easier to find ideas and perspectives across different topics.",
      details:
        "IdeaVault brings ideas together in one place, allowing users to explore different categories and discover perspectives they may not have considered.",
    },
    {
      id: 3,
      number: "03",
      title: "Interact",
      description:
        "Encourage discussion and meaningful interaction around shared ideas.",
      details:
        "Through comments and interactions, users can exchange opinions, ask questions, and provide constructive feedback.",
    },
    {
      id: 4,
      number: "04",
      title: "Encourage Innovation",
      description:
        "Create an environment where ideas can grow through collaboration.",
      details:
        "By sharing and discussing ideas, IdeaVault aims to encourage creative thinking and help users develop their concepts further.",
    },
  ];

  return (
    <section className="bg-white text-slate-950 px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">

        {/* ================= VISION ================= */}
        <div className="grid lg:grid-cols-12 gap-10 items-center mb-24">

          {/* Left Label */}
          <div className="lg:col-span-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-5">
              Our Vision
            </p>

            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Ideas
              <br />
              <span className="text-[#88BDF2]">Matter.</span>
            </h2>
          </div>

          {/* Vision Content */}
          <div className="lg:col-span-8">
            <div className="border-l-4 border-[#88BDF2] pl-7 md:pl-10">

              <h3 className="text-3xl md:text-5xl font-semibold leading-tight mb-6">
                A place where ideas can be
                <span className="text-[#88BDF2]"> shared, explored,</span>{" "}
                and developed.
              </h3>

              <p className="text-lg md:text-xl text-slate-500 leading-8 max-w-3xl">
                Our vision is to create a simple and accessible platform
                where people can bring their ideas into the open, discover
                different perspectives, and engage in meaningful discussions.
                IdeaVault aims to make the journey from an initial thought
                to a developed idea more collaborative.
              </p>

            </div>
          </div>
        </div>


        {/* ================= WHY IDEAVAULT ================= */}
        <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-14 mb-24">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#88BDF2] mb-5">
                Why IdeaVault?
              </p>

              <h3 className="text-4xl md:text-5xl font-semibold leading-tight">
                Not every good idea gets a place to be heard.
              </h3>
            </div>

            <div>
              <p className="text-slate-300 text-lg leading-8">
                People often have creative thoughts, project concepts,
                solutions, and interesting perspectives but may not have a
                dedicated platform to share them. IdeaVault was created to
                provide that space.
              </p>

              <p className="text-slate-400 mt-5 leading-7">
                Users can publish ideas, explore different categories, and
                interact with other users through discussions and comments.
              </p>
            </div>

          </div>
        </div>


        {/* ================= GOALS ================= */}
        <div>

          {/* Goals Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-4">
                What We Aim To Do
              </p>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Our Goals
              </h2>
            </div>

            <p className="text-slate-500 max-w-md leading-7">
              Four simple goals guide the purpose of IdeaVault and shape how
              users can interact with the platform.
            </p>

          </div>


          {/* Goal List */}
          <div className="border-t border-slate-200">

            {goals.map((goal) => {
              const isActive = activeGoal === goal.id;

              return (
                <div
                  key={goal.id}
                  onClick={() =>
                    setActiveGoal(isActive ? null : goal.id)
                  }
                  className={`border-b border-slate-200 cursor-pointer transition-all duration-500 ${
                    isActive ? "bg-[#88BDF2]/10" : "hover:bg-slate-50"
                  }`}
                >

                  {/* Main Row */}
                  <div className="grid grid-cols-12 items-center gap-4 py-7 md:py-9 px-4">

                    {/* Number */}
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={`font-mono text-sm ${
                          isActive
                            ? "text-[#88BDF2]"
                            : "text-slate-400"
                        }`}
                      >
                        {goal.number}
                      </span>
                    </div>


                    {/* Title */}
                    <div className="col-span-7 md:col-span-8">
                      <h3
                        className={`text-2xl md:text-4xl font-semibold transition-colors ${
                          isActive
                            ? "text-slate-950"
                            : "text-slate-800"
                        }`}
                      >
                        {goal.title}
                      </h3>

                      <p className="mt-2 text-sm md:text-base text-slate-500 max-w-xl">
                        {goal.description}
                      </p>
                    </div>


                    {/* Icon */}
                    <div className="col-span-3 md:col-span-3 flex justify-end">

                      <div
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? "bg-[#88BDF2] border-[#88BDF2] rotate-45"
                            : "border-slate-300"
                        }`}
                      >
                        <span className="text-xl">
                          +
                        </span>
                      </div>

                    </div>

                  </div>


                  {/* Expanded Content */}
                  <div
                    className={`grid transition-all duration-500 ${
                      isActive
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">

                      <div className="pb-8 pl-[16.66%] pr-6 md:pl-[8.33%] md:pr-[16.66%]">

                        <div className="border-l-2 border-[#88BDF2] pl-5">
                          <p className="text-slate-600 leading-7">
                            {goal.details}
                          </p>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>


        {/* ================= FINAL STATEMENT ================= */}
        <div className="mt-24 pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between gap-6">

          <h3 className="text-3xl md:text-5xl font-semibold max-w-3xl leading-tight">
            Every idea has the potential to start a
            <span className="text-[#88BDF2]"> conversation.</span>
          </h3>

          <div className="flex items-end">
            <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Share • Discover • Interact
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Aim;