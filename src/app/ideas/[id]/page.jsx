
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
      <main className="min-h-screen bg-[#f7f7f5] flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-400 font-semibold mb-4">
            404 / Not Found
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-black">
            Idea Not Found
          </h1>

          <p className="text-gray-500 mt-3">
            The idea you're looking for doesn't exist.
          </p>
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

  const comments = commentsRes.ok
    ? await commentsRes.json()
    : [];

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-black">

      {/* PAGE */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-6 lg:py-8">

        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-6">

          <div className="flex items-center gap-3">
            <div className="w-7 h-[2px] bg-black" />

            <span className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-500">
              Idea Details
            </span>
          </div>

          <span className="text-[11px] text-gray-400 font-mono">
            ID / {id.slice(-6)}
          </span>

        </div>


        {/* HERO */}
        <section className="bg-white border border-gray-200 rounded-[28px] overflow-hidden">

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] min-h-[430px]">

            {/* IMAGE */}
            <div className="relative bg-black min-h-[300px] lg:min-h-[430px]">

              {idea.imageUrl ? (
                <img
                  src={idea.imageUrl}
                  alt={idea.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    No image available
                  </span>
                </div>
              )}

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* CATEGORY */}
              <div className="absolute top-5 left-5">
                <span className="px-4 py-2 rounded-full bg-white text-black text-[10px] uppercase tracking-[0.18em] font-bold">
                  {idea.category}
                </span>
              </div>

              {/* BOTTOM IMAGE TEXT */}
              <div className="absolute bottom-6 left-6 right-6">

                <p className="text-[10px] uppercase tracking-[0.25em] text-white/60 mb-2">
                  Featured Concept
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white" />

                  <span className="text-xs text-white/80">
                    Innovation / Concept
                  </span>
                </div>

              </div>

            </div>


            {/* HERO CONTENT */}
            <div className="p-7 md:p-10 lg:p-12 flex flex-col justify-between">

              <div>

                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-black" />

                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">
                    Idea Proposal
                  </span>
                </div>


                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold tracking-[-0.04em] leading-[1.02] max-w-xl">
                  {idea.title}
                </h1>


                <p className="text-gray-500 text-base md:text-lg leading-7 mt-6 max-w-xl">
                  {idea.shortDescription}
                </p>


                {/* TAGS */}
                {idea.tags && (
                  <div className="flex flex-wrap gap-2 mt-7">
                    {idea.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="border border-gray-200 px-3 py-1.5 rounded-full text-[11px] font-semibold text-gray-600"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

              </div>


              {/* BUDGET */}
              <div className="border-t border-gray-200 mt-10 pt-6 flex items-end justify-between">

                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Estimated Budget
                  </p>

                  <p className="text-3xl md:text-4xl font-bold tracking-tight mt-1">
                    ৳ {idea.estimatedBudget}
                  </p>
                </div>


                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Target
                  </p>

                  <p className="text-sm font-semibold mt-1 max-w-[150px]">
                    {idea.targetAudience}
                  </p>
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* MAIN CONTENT */}
        <section className="grid lg:grid-cols-[1fr_320px] gap-6 mt-6">


          {/* LEFT */}
          <div className="space-y-5">


            {/* PROBLEM */}
            <article className="bg-white border border-gray-200 rounded-[24px] p-7 md:p-9">

              <div className="flex items-start justify-between mb-7">

                <div className="flex items-center gap-4">

                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    01
                  </span>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                      Challenge
                    </p>

                    <h2 className="text-xl font-bold mt-1">
                      Problem Statement
                    </h2>
                  </div>

                </div>

                <span className="text-gray-300 font-mono text-xs">
                  /01
                </span>

              </div>


              <p className="text-gray-600 leading-8 text-[15px]">
                {idea.problemStatement}
              </p>

            </article>


            {/* SOLUTION */}
            <article className="bg-white border border-gray-200 rounded-[24px] p-7 md:p-9">

              <div className="flex items-start justify-between mb-7">

                <div className="flex items-center gap-4">

                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    02
                  </span>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                      Approach
                    </p>

                    <h2 className="text-xl font-bold mt-1">
                      Proposed Solution
                    </h2>
                  </div>

                </div>

                <span className="text-gray-300 font-mono text-xs">
                  /02
                </span>

              </div>


              <p className="text-gray-600 leading-8 text-[15px]">
                {idea.proposedSolution}
              </p>

            </article>


            {/* DESCRIPTION */}
            <article className="bg-white border border-gray-200 rounded-[24px] p-7 md:p-9">

              <div className="flex items-start justify-between mb-7">

                <div className="flex items-center gap-4">

                  <span className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                    03
                  </span>

                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                      Overview
                    </p>

                    <h2 className="text-xl font-bold mt-1">
                      Detailed Description
                    </h2>
                  </div>

                </div>

                <span className="text-gray-300 font-mono text-xs">
                  /03
                </span>

              </div>


              <p className="text-gray-600 leading-8 text-[15px] whitespace-pre-line">
                {idea.detailedDescription}
              </p>

            </article>

          </div>


          {/* RIGHT SIDEBAR */}
          <aside className="space-y-5">


            {/* TARGET */}
            <div className="bg-black text-white rounded-[24px] p-7">

              <div className="flex items-center justify-between">

                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-bold">
                  Target Audience
                </p>

                <span className="text-gray-600 font-mono text-xs">
                  01
                </span>

              </div>


              <h3 className="text-2xl font-bold tracking-tight mt-6">
                {idea.targetAudience}
              </h3>


              <div className="w-full h-px bg-gray-800 my-6" />


              <p className="text-gray-500 text-sm leading-6">
                The primary group of people who may benefit from this idea.
              </p>

            </div>


            {/* INFORMATION */}
            <div className="bg-white border border-gray-200 rounded-[24px] p-7">

              <div className="flex items-center justify-between mb-7">

                <h3 className="font-bold text-lg">
                  Idea Information
                </h3>

                <span className="text-[10px] font-mono text-gray-400">
                  INFO
                </span>

              </div>


              <div className="space-y-6">


                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Category
                  </p>

                  <p className="font-semibold mt-2">
                    {idea.category}
                  </p>
                </div>


                <div className="border-t border-gray-100 pt-5">

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Budget
                  </p>

                  <p className="font-semibold text-lg mt-2">
                    ৳ {idea.estimatedBudget}
                  </p>

                </div>


                <div className="border-t border-gray-100 pt-5">

                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold">
                    Audience
                  </p>

                  <p className="font-semibold mt-2">
                    {idea.targetAudience}
                  </p>

                </div>


              </div>

            </div>


            {/* BOTTOM MARK */}
            <div className="px-2 pt-2 flex items-center justify-between">

              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-bold">
                IdeaVault
              </span>

              <span className="text-[9px] font-mono text-gray-400">
                2026
              </span>

            </div>

          </aside>

        </section>


        {/* ADD COMMENT BUTTON */}
        <div className="mt-8">
          <Link href={`/add-comments?ideaId=${id}`}>
            <Button>
              Add comments
            </Button>
          </Link>
        </div>


        {/* COMMENTS */}
        <Comments initialComments={comments} />

      </div>

    </main>
  );
};

export default IdeaDetailsPage;

