"use client";

import { useState } from "react";

const Comments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Edit button
  const handleEdit = (comment) => {
    setEditingId(comment._id);
    setEditText(comment.comment);
  };

  // Save edited comment
  const handleUpdate = async (id) => {
    if (!editText.trim()) {
      alert("Comment cannot be empty");
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
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setComments((prevComments) =>
          prevComments.map((item) =>
            item._id === id
              ? { ...item, comment: editText }
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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:5000/comment/${id}`,
        {
          method: "DELETE",
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
      <h2 className="text-2xl font-bold mb-5">
        Comments
      </h2>

      {comments.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-[20px] p-6">
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-white border border-gray-200 rounded-[20px] p-6"
            >
              {editingId === comment._id ? (
                // EDIT MODE
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
                // NORMAL MODE
                <>
                  <p className="text-gray-700 leading-7">
                    {comment.comment}
                  </p>

                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(
                      comment.createdAt
                    ).toLocaleString()}
                  </p>

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
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;