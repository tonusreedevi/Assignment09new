"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import IdeaCard from "@/component/IdeaCard";

const MyInteraction = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyInteractions = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        // 1. Get comments made by current user
        const commentsRes = await fetch(
          `http://localhost:5000/comment/user/${user.id}`
        );

        const comments = await commentsRes.json();

        // 2. Get unique idea IDs
        const ideaIds = [
          ...new Set(
            comments.map((comment) => comment.ideaId)
          ),
        ];

        // 3. Get all ideas
        const ideasRes = await fetch(
          "http://localhost:5000/idea"
        );

        const allIdeas = await ideasRes.json();

        // 4. Only keep ideas where current user commented
        const myInteractionIdeas = allIdeas.filter((idea) =>
          ideaIds.includes(idea._id)
        );

        setIdeas(myInteractionIdeas);

      } catch (error) {
        console.error(
          "Failed to load my interactions:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyInteractions();
  }, [user?.id]);


  /* =========================
      NOT LOGGED IN
  ========================== */

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              IdeaVault
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
              My Interactions
            </h1>

            <p className="mt-5 text-base leading-7 text-slate-500">
              Sign in to see the ideas you have commented on
              and continue your discussions.
            </p>

          </div>

          <div className="mt-10 border border-slate-200 bg-white p-8">

            <p className="text-sm text-slate-500">
              Please login to see your interactions.
            </p>

          </div>

        </section>

      </main>
    );
  }


  /* =========================
      LOADING
  ========================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
            IdeaVault
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
            My Interactions
          </h1>

          <div className="mt-10 border-y border-slate-200 py-8">

            <div className="flex items-center gap-3">

              <div className="h-2 w-2 animate-pulse rounded-full bg-red-700" />

              <p className="text-sm text-slate-500">
                Loading your interactions...
              </p>

            </div>

          </div>

        </section>

      </main>
    );
  }


  /* =========================
      MAIN PAGE
  ========================== */

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="max-w-3xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              Your Activity
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              My Interactions
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Revisit the ideas youve commented on and
              continue exploring the conversations that
              caught your attention.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          CONTENT
      ========================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

        {/* Results header */}

        <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-5">

          <div>

            <p className="text-sm font-semibold text-slate-900">
              Ideas youve interacted with
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {ideas.length}{" "}
              {ideas.length === 1 ? "idea" : "ideas"}
            </p>

          </div>

        </div>


        {/* =========================
            EMPTY STATE
        ========================== */}

        {ideas.length === 0 ? (

          <div className="border border-slate-200 bg-white px-6 py-16 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-slate-200 text-lg font-semibold text-slate-400">
              —
            </div>

            <h2 className="mt-5 text-xl font-semibold text-slate-950">
              No interactions yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              You havenot commented on any ideas yet.
              Explore the IdeaVault community and join
              a conversation.
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

export default MyInteraction;