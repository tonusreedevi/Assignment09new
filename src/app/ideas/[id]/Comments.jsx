
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
    // Extra frontend protection
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
    <div className="mt-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-bold">
          Comments
        </h2>

        <span className="text-sm text-gray-400">
          {comments.length}{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {/* NO COMMENTS */}
      {comments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="space-y-4">

          {comments.map((comment) => {

            // Check ownership
            const isOwner =
              user?.id === comment.userId;

            return (
              <div
                key={comment._id}
                className="bg-white border border-gray-200 rounded-[20px] p-6"
              >

                {/* USER INFO */}
                <div className="flex items-center gap-3 mb-4">

                  {/* PROFILE IMAGE */}
                  {comment.userImage ? (
                    <img
                      src={comment.userImage}
                      alt={comment.userName || "User"}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold">
                      {comment.userName
                        ? comment.userName
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>
                  )}

                  <div>
                    <p className="font-semibold text-gray-900">
                      {comment.userName || "Unknown User"}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(
                        comment.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                </div>

                {/* EDIT MODE */}
                {editingId === comment._id ? (
                  <div>

                    <textarea
                      value={editText}
                      onChange={(e) =>
                        setEditText(e.target.value)
                      }
                      rows={4}
                      className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:border-cyan-500"
                    />

                    <div className="flex gap-3 mt-4">

                      <button
                        onClick={() =>
                          handleUpdate(comment._id)
                        }
                        className="rounded-xl bg-cyan-600 px-5 py-2 text-sm font-medium text-white hover:bg-cyan-700"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditText("");
                        }}
                        className="rounded-xl border border-gray-200 px-5 py-2 text-sm font-medium text-gray-700"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>
                ) : (
                  <>
                    {/* COMMENT TEXT */}
                    <p className="text-gray-700 leading-7">
                      {comment.comment}
                    </p>

                    {/* UPDATED */}
                    {comment.updatedAt &&
                      new Date(comment.updatedAt).getTime() !==
                        new Date(comment.createdAt).getTime() && (
                        <p className="text-xs text-gray-400 mt-2">
                          Edited
                        </p>
                      )}

                    {/* OWNER BUTTONS */}
                    {isOwner && (
                      <div className="flex gap-3 mt-5">

                        <button
                          onClick={() =>
                            handleEdit(comment)
                          }
                          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(comment._id)
                          }
                          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                        >
                          Delete
                        </button>

                      </div>
                    )}
                  </>
                )}

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default Comments;

