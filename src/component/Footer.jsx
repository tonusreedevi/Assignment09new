"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-slate-600 px-6 md:px-16 pt-20 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* ================= TOP ================= */}
        <div className="grid lg:grid-cols-2 gap-16 pb-16 border-b border-slate-200">

          {/* Brand */}
          <div>
            {/* Logo */}
            <Link href="/" className="inline-block mb-8">
              <p className="text-[24px] font-semibold tracking-[-0.05em] leading-none text-slate-950">
                <span>Idea</span>
                <span className="font-black text-[#4A90E2]">Vault</span>
                <span className="ml-1 text-[#88BDF2]">.</span>
              </p>
            </Link>

            {/* Main Statement */}
            <h3 className="text-4xl md:text-5xl font-semibold text-slate-950 leading-[1.05] tracking-tight max-w-xl">
              Give your ideas a place
              <span className="text-[#4A90E2]"> to grow.</span>
            </h3>

            <p className="mt-6 max-w-lg text-slate-500 leading-7">
              A space to share ideas, discover different perspectives, and
              connect through meaningful conversations.
            </p>
          </div>


          {/* Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">

            {/* Explore */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A90E2] mb-5">
                Explore
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/ideas"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    All Ideas
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-ideas"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    Share an Idea
                  </Link>
                </li>
              </ul>
            </div>


            {/* Community */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A90E2] mb-5">
                Community
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/my-ideas"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    My Ideas
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-interactions"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    My Interactions
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-ideas"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    Contribute
                  </Link>
                </li>
              </ul>
            </div>


            {/* Platform */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4A90E2] mb-5">
                Platform
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/ideas"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    Discover
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    About IdeaVault
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="hover:text-[#4A90E2] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>


        {/* ================= IDEA STATEMENT ================= */}
        <div className="py-12 border-b border-slate-200">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400 mb-3">
                The IdeaVault Philosophy
              </p>

              <p className="text-2xl md:text-3xl font-medium tracking-tight text-slate-950 leading-tight">
                Share what you think.
                <span className="text-[#4A90E2]">
                  {" "}Discover what others imagine.
                </span>
              </p>
            </div>

            <Link
              href="/login"
              className="group inline-flex items-center gap-4 border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:border-[#88BDF2] hover:bg-[#88BDF2]"
            >
              Share an Idea

            
            </Link>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          <p className="text-sm text-slate-400">
            © 2026 IdeaVault. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-slate-400">
            <span>Ideas</span>

            <span className="w-1 h-1 rounded-full bg-[#88BDF2]" />

            <span>Discussion</span>

            <span className="w-1 h-1 rounded-full bg-[#88BDF2]" />

            <span>Innovation</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;