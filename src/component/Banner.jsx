"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <section className="bg-[#FAF9F6] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="min-h-[520px] flex items-center justify-center text-center">

          <div className="max-w-3xl">

            {/* Small heading */}

            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-red-700">
              IdeaVault
            </p>


            {/* Main heading */}

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-[-0.05em] leading-[1.05] text-slate-950">
              Where ideas
              <br />
              <span className="text-red-700">
                become possibilities.
              </span>
            </h1>


            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-500">
              Discover thoughtful ideas, share your own, and connect
              with people who are building what comes next.
            </p>


            {/* Buttons */}

            <div className="mt-9 flex flex-wrap justify-center gap-3">

              <Link
                href="/ideas"
                className="bg-red-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Explore Ideas
                <span className="ml-2">→</span>
              </Link>

              <Link
                href="/add-ideas"
                className="border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
              >
                Share an Idea
              </Link>

            </div>


            {/* Bottom information */}

            <div className="mt-14 flex justify-center gap-8 text-sm">

              <div>
                <p className="font-semibold text-slate-950">
                  1,200+
                </p>

                <p className="mt-1 text-slate-500">
                  Ideas
                </p>
              </div>


              <div className="h-8 w-px bg-slate-200" />


              <div>
                <p className="font-semibold text-slate-950">
                  24+
                </p>

                <p className="mt-1 text-slate-500">
                  Categories
                </p>
              </div>


              <div className="h-8 w-px bg-slate-200" />


              <div>
                <p className="font-semibold text-slate-950">
                  4.8k+
                </p>

                <p className="mt-1 text-slate-500">
                  Interactions
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Banner;