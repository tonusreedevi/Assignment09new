"use client";

import React, { useState } from "react";

const Investors = () => {
  const [activeInvestor, setActiveInvestor] = useState(null);

  const investors = [
    {
      id: 1,
      number: "01",
      name: "Warren Buffett",
      country: "United States",
      role: "Value Investor",
      description:
        "Known for long-term investing, disciplined decision-making, and focusing on the underlying value of businesses.",
    },
    {
      id: 2,
      number: "02",
      name: "Ray Dalio",
      country: "United States",
      role: "Investor & Founder",
      description:
        "Founder of Bridgewater Associates and known for his principles-based approach to investing and decision-making.",
    },
    {
      id: 3,
      number: "03",
      name: "Peter Thiel",
      country: "United States",
      role: "Technology Investor",
      description:
        "Technology entrepreneur and investor known for supporting innovative technology companies and startups.",
    },
    {
      id: 4,
      number: "04",
      name: "Masayoshi Son",
      country: "Japan",
      role: "Technology Investor",
      description:
        "Founder of SoftBank and a major technology investor with a strong focus on emerging technologies.",
    },
    {
      id: 5,
      number: "05",
      name: "Cathie Wood",
      country: "United States",
      role: "Innovation Investor",
      description:
        "Founder and CEO of ARK Invest, known for investing in disruptive technologies and innovation.",
    },
    {
      id: 6,
      number: "06",
      name: "Mark Cuban",
      country: "United States",
      role: "Entrepreneur & Investor",
      description:
        "Entrepreneur and investor who has supported numerous startups and technology-driven businesses.",
    },
    {
      id: 7,
      number: "07",
      name: "Reid Hoffman",
      country: "United States",
      role: "Venture Investor",
      description:
        "LinkedIn co-founder and venture investor known for supporting technology startups and entrepreneurs.",
    },
    {
      id: 8,
      number: "08",
      name: "Naval Ravikant",
      country: "United States",
      role: "Angel Investor",
      description:
        "Entrepreneur and angel investor known for investing in technology startups and discussing entrepreneurship and wealth creation.",
    },
  ];

  return (
    <section className="bg-[#FAF9F6] text-slate-950 px-6 md:px-16 py-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 mb-16">

          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 mb-5">
              Investor Inspiration
            </p>

            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] tracking-tight">
              Think
              <br />
              <span className="text-[#88BDF2]">Beyond.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="text-lg md:text-xl text-slate-500 leading-8 max-w-xl">
              Great ideas often need vision, patience, and the courage to
              invest in possibilities. Here are some globally recognized
              investors whose approaches have influenced the world of
              entrepreneurship and innovation.
            </p>
          </div>

        </div>

        {/* Investor List */}
        <div className="border-t border-slate-300">

          {investors.map((investor) => {
            const isActive = activeInvestor === investor.id;

            return (
              <div
                key={investor.id}
                onClick={() =>
                  setActiveInvestor(isActive ? null : investor.id)
                }
                className={`border-b border-slate-300 cursor-pointer transition-all duration-500 ${
                  isActive
                    ? "bg-[#88BDF2]/15"
                    : "hover:bg-white"
                }`}
              >

                {/* Main Row */}
                <div className="grid grid-cols-12 items-center gap-4 py-7 md:py-9 px-4">

                  {/* Number */}
                  <div className="col-span-2 md:col-span-1">
                    <span
                      className={`font-mono text-sm ${
                        isActive
                          ? "text-[#4b91d1]"
                          : "text-slate-400"
                      }`}
                    >
                      {investor.number}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="col-span-7 md:col-span-5">
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      {investor.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {investor.role}
                    </p>
                  </div>

                  {/* Country */}
                  <div className="hidden md:block md:col-span-3">
                    <span className="text-sm text-slate-500">
                      {investor.country}
                    </span>
                  </div>

                  {/* Expand */}
                  <div className="col-span-3 md:col-span-3 flex justify-end">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-[#88BDF2] border-[#88BDF2] rotate-45"
                          : "border-slate-300"
                      }`}
                    >
                      <span className="text-xl">+</span>
                    </div>
                  </div>

                </div>

                {/* Details */}
                <div
                  className={`grid transition-all duration-500 ${
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">

                    <div className="pb-8 pl-[16.66%] md:pl-[8.33%] pr-6 md:pr-[16.66%]">

                      <div className="border-l-2 border-[#88BDF2] pl-5">
                        <p className="text-slate-600 leading-7">
                          {investor.description}
                        </p>
                      </div>

                    </div>

                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Bottom Statement */}
        <div className="mt-16 flex flex-col md:flex-row justify-between gap-6">

          <p className="text-2xl md:text-3xl font-medium max-w-2xl">
            "Invest in ideas that have the potential to change
            <span className="text-[#88BDF2]"> what comes next.</span>"
          </p>

          <p className="text-sm uppercase tracking-[0.2em] text-slate-400 self-end">
            Vision • Risk • Innovation
          </p>

        </div>

      </div>
    </section>
  );
};

export default Investors;