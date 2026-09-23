import IdeaCard from "@/component/IdeaCard";

const IdeaPage = async () => {
  const res = await fetch("http://localhost:5000/idea", {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="border border-red-200 bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-red-700">
              Error
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-slate-950">
              Failed to load ideas
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Something went wrong while loading the ideas. Please try again.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const ideas = await res.json();

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              IdeaVault
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Explore Ideas
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Discover new ideas, explore different perspectives, and find
              concepts that could turn into something meaningful.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          IDEAS
      ========================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Results information */}

        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">

          <div>
            <p className="text-sm font-medium text-slate-900">
              All Ideas
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {ideas.length}{" "}
              {ideas.length === 1 ? "idea" : "ideas"} available
            </p>
          </div>

        </div>


        {/* =========================
            EMPTY STATE
        ========================== */}

        {ideas.length === 0 ? (

          <div className="border border-slate-200 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-200 text-lg font-semibold text-slate-400">
              +
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-950">
              No ideas yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are no ideas available at the moment. Be the first
              to share something with the community.
            </p>

          </div>

        ) : (

          /* =========================
             IDEA GRID
          ========================== */

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            {ideas.map((idea) => (

              <IdeaCard
                key={idea._id}
                idea={idea}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  );
};

export default IdeaPage;