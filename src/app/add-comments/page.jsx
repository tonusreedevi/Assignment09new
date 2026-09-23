"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Addcomment = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ideaId = searchParams.get("ideaId");

  // Get logged-in user
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check login
    if (!user) {
      alert("Please login first to add a comment.");
      router.push("/login");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const comment = {
      ideaId: ideaId,
      userId: user.id,
      userName: user.name,
      userImage: user.image || "",
      comment: formData.get("comment"),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    console.log("Comment:", comment);

    try {
      const res = await fetch(
        "http://localhost:5000/comment",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(comment),
        }
      );

      const data = await res.json();

      console.log("Response:", data);

      if (res.ok) {
        alert("Comment added successfully!");

        router.push(`/ideas/${ideaId}`);
      } else {
        alert(data.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* =========================
          HEADER
      ========================== */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

          <div className="max-w-2xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              IdeaVault
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
              Share your thoughts
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Add a thoughtful comment and contribute to the
              conversation around this idea.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          COMMENT FORM
      ========================== */}

      <section className="mx-auto max-w-4xl px-6 py-12 lg:px-8">

        <div className="border border-slate-200 bg-white">

          <form
            onSubmit={onSubmit}
            className="p-6 md:p-8"
          >

            {/* Form heading */}

            <div className="mb-8 border-b border-slate-200 pb-6">

              <p className="text-sm font-semibold text-slate-950">
                Add Comment
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Your comment will be visible to other IdeaVault users.
              </p>

            </div>


            {/* Comment field */}

            <div>

              <label
                htmlFor="comment"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
              >
                Your Comment
              </label>

              <textarea
                id="comment"
                name="comment"
                required
                rows={7}
                placeholder="Share your thoughts about this idea..."
                className="w-full resize-none border border-slate-300 bg-[#FAF9F6] px-4 py-4 text-sm leading-7 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-700 focus:bg-white"
              />

              <p className="mt-2 text-xs text-slate-400">
                Keep your feedback constructive and relevant.
              </p>

            </div>


            {/* Actions */}

            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={() => router.back()}
                className="border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800"
              >
                Add Comment
                <span className="ml-2">
                  →
                </span>
              </button>

            </div>

          </form>

        </div>

      </section>

    </main>
  );
};

export default Addcomment;