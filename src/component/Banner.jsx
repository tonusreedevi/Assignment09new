"use client";

const Banner = () => {
  return (
    <section className="bg-black border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="min-h-[620px] flex flex-col items-center justify-center text-center relative py-24">

          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="max-w-4xl relative">

            {/* Small Heading */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#88bdf2]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/60">
                IdeaVault
              </p>
            </div>

            {/* Main Heading */}
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-semibold tracking-[-0.055em] leading-[0.98] text-white">
              Where ideas
              <br />
              <span className="text-[#88bdf2]">
                become possibilities.
              </span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-8 max-w-xl text-base sm:text-lg leading-8 text-white/45">
              A simple space to share ideas, discover new perspectives,
              and connect through meaningful discussions.
            </p>

          </div>

          {/* Platform Highlights */}
          <div className="mt-20 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 border-t border-white/10 relative">

            <div className="px-6 py-8 text-left">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#88bdf2]">
                01 — Share
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Publish
              </p>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Publish your ideas and make them visible to others.
              </p>
            </div>

            <div className="px-6 py-8 text-left sm:pl-8">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#88bdf2]">
                02 — Discover
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Explore
              </p>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Explore ideas across different topics and categories.
              </p>
            </div>

            <div className="px-6 py-8 text-left sm:pl-8">
              <p className="text-[11px] font-mono uppercase tracking-widest text-[#88bdf2]">
                03 — Interact
              </p>
              <p className="mt-3 text-lg font-semibold text-white">
                Discuss
              </p>
              <p className="mt-2 text-sm leading-6 text-white/40">
                Discuss ideas and exchange perspectives through comments.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;