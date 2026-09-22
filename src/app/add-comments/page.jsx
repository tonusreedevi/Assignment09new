
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
      const res = await fetch("http://localhost:5000/comment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(comment),
      });

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
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-3xl px-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">

          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Add Comment
          </h1>

          <p className="mb-6 text-sm text-slate-500">
            Share your thoughts about this idea.
          </p>

          <form onSubmit={onSubmit}>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Your Comment
            </label>

            <textarea
              name="comment"
              required
              rows="6"
              placeholder="Write your comment here..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                onClick={() => router.back()}
                className="rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-cyan-600 px-6 py-3 text-sm font-medium text-white hover:bg-cyan-700"
              >
                Add Comment
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Addcomment;

