
import { Button } from "@heroui/react";
import Link from "next/link";
import Comments from "./Comments";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  // Get idea
  const res = await fetch(`http://localhost:5000/idea/${id}`, {
    cache: "no-store",
  });

  // If idea doesn't exist
  if (!res.ok) {
    return (
      <main className="min-h-screen bg-[#f5f5f3] flex items-center justify-center px-6">
        <div className="w-full max-w-xl border border-black bg-white p-10 md:p-14">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-2 w-2 bg-black rounded-full" />

            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
              404 / Not Found
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold tracking-[-0.05em]">
            Idea not found.
          </h1>

          <p className="mt-5 text-gray-500 leading-7">
            The idea you are looking for may have been removed or does not
            exist.
          </p>

          <Link href="/ideas">
            <button className="mt-8 bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition">
              Back to Ideas →
            </button>
          </Link>
        </div>
      </main>
    );
  }

  const idea = await res.json();

  // Get comments for this specific idea
  const commentsRes = await fetch(
    `http://localhost:5000/comment/${id}`,
    {
      cache: "no-store",
    }
  );

  const comments = commentsRes.ok ? await commentsRes.json() : [];

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-black">

      {/* =====================================================
          TOP NAV / META
      ===================================================== */}

      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="h-16 flex items-center justify-between">

            <div className="flex items-center gap-4">

              <Link
                href="/ideas"
                className="text-xs font-semibold uppercase tracking-[0.2em] hover:opacity-50 transition"
              >
                Ideas
              </Link>

              <span className="text-gray-300">/</span>

              <span className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Details
              </span>

            </div>

            <span className="font-mono text-[10px] text-gray-400">
              ID / {id.slice(-8)}
            </span>

          </div>

        </div>
      </div>


      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-black bg-white">

        <div className="max-w-7xl mx-auto">

          <div className="grid lg:grid-cols-[1fr_0.95fr]">

            {/* IMAGE */}

            <div className="relative min-h-[420px] lg:min-h-[600px] bg-black overflow-hidden">

              {idea.imageUrl ? (
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 border border-gray-700 mx-auto mb-4" />

                    <p className="text-xs uppercase tracking-[0.25em] text-gray-600">
                      No Image
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* CATEGORY */}

              <div className="absolute top-7 left-7">

                <span className="inline-flex bg-white text-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                  {idea.category}
                </span>

              </div>


              {/* IMAGE FOOTER */}

              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between">

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/50 mb-2">
                    IdeaVault / Concept
                  </p>

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 bg-white rounded-full" />

                    <span className="text-xs text-white/80">
                      Community Idea
                    </span>

                  </div>

                </div>

                <span className="font-mono text-[10px] text-white/40">
                  01
                </span>

              </div>

            </div>


            {/* CONTENT */}

            <div className="flex flex-col justify-between p-7 md:p-12 lg:p-14">

              <div>

                <div className="flex items-center gap-3 mb-8">

                  <span className="w-8 h-px bg-black" />

                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    Idea Proposal
                  </span>

                </div>


                <h1 className="text-5xl md:text-6xl lg:text-[68px] font-bold tracking-[-0.06em] leading-[0.95]">
                  {idea.title}
                </h1>


                <p className="mt-8 text-base md:text-lg leading-8 text-gray-500 max-w-xl">
                  {idea.shortDescription}
                </p>


                {/* TAGS */}

                {idea.tags && (
                  <div className="flex flex-wrap gap-2 mt-9">

                    {idea.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="border border-gray-300 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600"
                      >
                        #{tag.trim()}
                      </span>
                    ))}

                  </div>
                )}

              </div>


              {/* HERO META */}

              <div className="mt-14 border-t border-black pt-7">

                <div className="grid grid-cols-2 gap-8">

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                      Estimated Budget
                    </p>

                    <p className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                      ৳ {idea.estimatedBudget}
                    </p>

                  </div>


                  <div>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                      Target Audience
                    </p>

                    <p className="text-sm font-semibold leading-6 mt-2 max-w-[180px]">
                      {idea.targetAudience}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        <section className="grid lg:grid-cols-[1fr_300px] gap-10 py-12 lg:py-16">


          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <div>

            {/* SECTION HEADER */}

            <div className="flex items-end justify-between border-b border-black pb-5 mb-8">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  The Concept
                </p>

                <h2 className="text-3xl font-bold tracking-tight mt-2">
                  Explore the idea
                </h2>

              </div>

              <span className="font-mono text-[10px] text-gray-400">
                01 — 03
              </span>

            </div>


            {/* PROBLEM */}

            <article className="border-b border-gray-300 pb-10 mb-10">

              <div className="flex gap-5">

                <span className="flex-shrink-0 text-[10px] font-mono text-gray-400 pt-1">
                  01
                </span>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                    Challenge
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                    Problem Statement
                  </h3>

                  <p className="mt-6 text-gray-600 text-[15px] leading-8 max-w-3xl">
                    {idea.problemStatement}
                  </p>

                </div>

              </div>

            </article>


            {/* SOLUTION */}

            <article className="border-b border-gray-300 pb-10 mb-10">

              <div className="flex gap-5">

                <span className="flex-shrink-0 text-[10px] font-mono text-gray-400 pt-1">
                  02
                </span>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                    Approach
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                    Proposed Solution
                  </h3>

                  <p className="mt-6 text-gray-600 text-[15px] leading-8 max-w-3xl">
                    {idea.proposedSolution}
                  </p>

                </div>

              </div>

            </article>


            {/* DESCRIPTION */}

            <article>

              <div className="flex gap-5">

                <span className="flex-shrink-0 text-[10px] font-mono text-gray-400 pt-1">
                  03
                </span>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                    Overview
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                    Detailed Description
                  </h3>

                  <p className="mt-6 text-gray-600 text-[15px] leading-8 max-w-3xl whitespace-pre-line">
                    {idea.detailedDescription}
                  </p>

                </div>

              </div>

            </article>

          </div>


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside>

            <div className="lg:sticky lg:top-8 space-y-5">


              {/* TARGET */}

              <div className="bg-black text-white p-7">

                <div className="flex items-center justify-between">

                  <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold">
                    Target
                  </span>

                  <span className="font-mono text-[10px] text-gray-600">
                    01
                  </span>

                </div>

                <h3 className="text-2xl font-bold tracking-tight mt-8">
                  {idea.targetAudience}
                </h3>

                <div className="h-px bg-gray-800 my-7" />

                <p className="text-sm leading-6 text-gray-500">
                  The primary audience this concept is designed to serve.
                </p>

              </div>


              {/* INFO */}

              <div className="border border-gray-300 bg-white p-7">

                <div className="flex items-center justify-between border-b border-black pb-5">

                  <h3 className="font-bold">
                    Information
                  </h3>

                  <span className="font-mono text-[9px] text-gray-400">
                    META
                  </span>

                </div>


                <div className="divide-y divide-gray-200">

                  <div className="py-5">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                      Category
                    </p>

                    <p className="mt-2 text-sm font-semibold">
                      {idea.category}
                    </p>

                  </div>


                  <div className="py-5">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                      Budget
                    </p>

                    <p className="mt-2 text-xl font-bold">
                      ৳ {idea.estimatedBudget}
                    </p>

                  </div>


                  <div className="py-5">

                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                      Audience
                    </p>

                    <p className="mt-2 text-sm font-semibold leading-6">
                      {idea.targetAudience}
                    </p>

                  </div>

                </div>

              </div>


              {/* IDEA MARK */}

              <div className="border-t border-black pt-4 flex items-center justify-between">

                <span className="text-[9px] uppercase tracking-[0.25em] font-bold">
                  IdeaVault
                </span>

                <span className="font-mono text-[9px] text-gray-400">
                  {id.slice(-6)}
                </span>

              </div>

            </div>

          </aside>

        </section>


        {/* =====================================================
            COMMENTS CTA
        ===================================================== */}

        <section className="border-t border-black py-10">

          <div className="bg-black text-white p-7 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-7">

            <div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">
                Community
              </p>

              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-2">
                Have something to say?
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                Share your thoughts and join the discussion around this idea.
              </p>

            </div>


            <Link href={`/add-comments?ideaId=${id}`}>

              <Button className="group bg-white text-black px-7 py-3 rounded-none font-semibold text-sm hover:bg-gray-200 transition">

                Add Comment

                <span className="ml-3 inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>

              </Button>

            </Link>

          </div>

        </section>


        {/* =====================================================
            COMMENTS
        ===================================================== */}

        <section className="pb-16">

          <div className="flex items-center justify-between border-b border-black pb-5 mb-8">

            <div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                Discussion
              </p>

              <h2 className="text-3xl font-bold tracking-tight mt-2">
                Community Comments
              </h2>

            </div>

            <span className="font-mono text-[10px] text-gray-400">
              {comments.length} COMMENTS
            </span>

          </div>

          <Comments initialComments={comments} />

        </section>


        {/* FOOTER MARK */}

        <div className="border-t border-black py-6 flex items-center justify-between">

          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">
            IdeaVault
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
            Create • Share • Discover
          </span>

        </div>

      </div>

    </main>
  );
};

export default IdeaDetailsPage;

