"use client";

import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 px-6 md:px-16 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">

        {/* ================= TOP ================= */}
        <div className="grid lg:grid-cols-2 gap-12 pb-16 border-b border-slate-800">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#88BDF2] flex items-center justify-center">
                <span className="text-slate-950 font-bold text-lg">
                  I
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white">
                IdeaVault
              </h2>
            </div>

            <h3 className="text-3xl md:text-5xl font-semibold text-white leading-tight max-w-xl">
              Give your ideas a place
              <span className="text-[#88BDF2]"> to grow.</span>
            </h3>

            <p className="mt-6 max-w-lg text-slate-400 leading-7">
              IdeaVault is a platform for sharing ideas, discovering new
              perspectives, and connecting through meaningful discussions.
            </p>
          </div>


          {/* Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">

            {/* Explore */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#88BDF2] mb-5">
                Explore
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition"
                  >
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    href="/ideas"
                    className="hover:text-white transition"
                  >
                    All Ideas
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-ideas"
                    className="hover:text-white transition"
                  >
                    Share an Idea
                  </Link>
                </li>
              </ul>
            </div>


            {/* Community */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#88BDF2] mb-5">
                Community
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/my-ideas"
                    className="hover:text-white transition"
                  >
                    My Ideas
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-interactions"
                    className="hover:text-white transition"
                  >
                    My Interactions
                  </Link>
                </li>

                <li>
                  <Link
                    href="/add-ideas"
                    className="hover:text-white transition"
                  >
                    Contribute
                  </Link>
                </li>
              </ul>
            </div>


            {/* Platform */}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#88BDF2] mb-5">
                Platform
              </p>

              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/ideas"
                    className="hover:text-white transition"
                  >
                    Discover
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition"
                  >
                    About IdeaVault
                  </Link>
                </li>

                <li>
                  <Link
                    href="/"
                    className="hover:text-white transition"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>


        {/* ================= MIDDLE STATEMENT ================= */}
        <div className="py-12 border-b border-slate-800">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed">
              Share what you think.
              <span className="text-[#88BDF2]"> Discover what others imagine.</span>
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 bg-[#88BDF2] text-slate-950 px-6 py-3 font-semibold text-sm hover:bg-[#a5d0f8] transition w-fit"
            >
              Share an Idea
              <span className="text-lg">→</span>
            </Link>

          </div>

        </div>


        {/* ================= BOTTOM ================= */}
        <div className="pt-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-5">

          <div>
            <p className="text-sm text-slate-500">
              © 2026 IdeaVault. All rights reserved.
            </p>
          </div>

          

        </div>

      </div>
    </footer>
  );
};

export default Footer;