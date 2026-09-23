"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

const Comments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Get logged-in user
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Edit button
  const handleEdit = (comment) => {
    if (comment.userId !== user?.id) {
      alert("You can only edit your own comment.");
      return;
    }

    setEditingId(comment._id);
    setEditText(comment.comment);
  };

  // Save edited comment
  const handleUpdate = async (id) => {
    if (!editText.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/comment/${id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            comment: editText,
            userId: user.id,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prevComments) =>
          prevComments.map((item) =>
            item._id === id
              ? {
                  ...item,
                  comment: editText,
                  updatedAt: new Date(),
                }
              : item
          )
        );

        setEditingId(null);
        setEditText("");
      } else {
        alert(data.message || "Failed to update comment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  // Delete comment
  const handleDelete = async (id) => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/comment/${id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prevComments) =>
          prevComments.filter((item) => item._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">

      {/* =========================
          HEADER
      ========================== */}

      <div className="mb-8 flex items-end justify-between">

        <div>

          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-700">
            Discussion
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Comments
          </h2>

        </div>

        <span className="text-sm text-slate-400">
          {comments.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </span>

      </div>


      {/* =========================
          NO COMMENTS
      ========================== */}

      {comments.length === 0 ? (

        <div className="border border-slate-200 bg-white px-6 py-10 text-center">

          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center border border-slate-200 text-sm font-semibold text-slate-500">
            —
          </div>

          <h3 className="text-base font-semibold text-slate-900">
            No comments yet
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Be the first person to share your thoughts about this idea.
          </p>

        </div>

      ) : (

        <div className="divide-y divide-slate-200 border-y border-slate-200">

          {comments.map((comment) => {

            const isOwner =
              user?.id === comment.userId;

            return (

              <article
                key={comment._id}
                className="py-7"
              >

                {/* =========================
                    USER INFORMATION
                ========================== */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3">

                    {/* Profile image */}

                    {comment.userImage ? (

                      <img
                        src={comment.userImage}
                        alt={comment.userName || "User"}
                        className="h-9 w-9 rounded-full border border-slate-200 object-cover"
                      />

                    ) : (

                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                        {comment.userName
                          ? comment.userName
                              .charAt(0)
                              .toUpperCase()
                          : "U"}
                      </div>

                    )}

                    <div>

                      <p className="text-sm font-semibold text-slate-900">
                        {comment.userName || "Unknown User"}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-400">
                        {new Date(
                          comment.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                  </div>

                </div>


                {/* =========================
                    EDIT MODE
                ========================== */}

                {editingId === comment._id ? (

                  <div className="mt-5">

                    <textarea
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      rows={4}
                      className="w-full resize-none border border-slate-300 bg-white p-4 text-sm text-slate-800 outline-none transition focus:border-red-700"
                      placeholder="Write your comment..."
                    />

                    <div className="mt-4 flex gap-3">

                      <button
                        onClick={() =>
                          handleUpdate(comment._id)
                        }
                        className="bg-red-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-800"
                      >
                        Save changes
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditText("");
                        }}
                        className="border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                ) : (

                  <>

                    {/* =========================
                        COMMENT TEXT
                    ========================== */}

                    <div className="mt-5 pl-12">

                      <p className="max-w-3xl text-[15px] leading-7 text-slate-600">
                        {comment.comment}
                      </p>


                      {/* Edited */}

                      {comment.updatedAt &&
                        new Date(
                          comment.updatedAt
                        ).getTime() !==
                          new Date(
                            comment.createdAt
                          ).getTime() && (

                          <p className="mt-2 text-xs text-slate-400">
                            Edited
                          </p>

                        )}


                      {/* =========================
                          OWNER ACTIONS
                      ========================== */}

                      {isOwner && (

                        <div className="mt-5 flex gap-4">

                          <button
                            onClick={() =>
                              handleEdit(comment)
                            }
                            className="text-xs font-semibold text-slate-500 transition hover:text-red-700"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(comment._id)
                            }
                            className="text-xs font-semibold text-red-700 transition hover:text-red-800"
                          >
                            Delete
                          </button>

                        </div>

                      )}

                    </div>

                  </>

                )}

              </article>

            );

          })}

        </div>

      )}

    </section>
  );
};

export default Comments;