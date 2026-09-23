"use client";

import { useState } from "react";

const UpdateUserProfile = ({
  user,
  onClose,
  onUpdate,
  isUpdating,
}) => {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [previewImage, setPreviewImage] = useState(
    user.image || ""
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdate({
      name,
      image,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">

      {/* Modal */}

      <div className="w-full max-w-lg border border-slate-200 bg-white">

        {/* =========================
            HEADER
        ========================== */}

        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-red-700">
              Account
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Edit Profile
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update your IdeaVault profile information.
            </p>

          </div>

          {/* Close button */}

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center border border-slate-200 text-lg text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
            aria-label="Close"
          >
            ×
          </button>

        </div>


        {/* =========================
            FORM
        ========================== */}

        <form
          onSubmit={handleSubmit}
          className="p-6"
        >

          {/* =========================
              PROFILE IMAGE
          ========================== */}

          <div className="border-b border-slate-200 pb-6">

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Profile Image
            </p>

            <div className="flex items-center gap-5">

              {/* Preview */}

              {previewImage ? (

                <img
                  src={previewImage}
                  alt="Profile preview"
                  className="h-20 w-20 rounded-full border border-slate-200 object-cover"
                />

              ) : (

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-950 text-2xl font-semibold text-white">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>

              )}

              {/* Upload */}

              <div className="flex-1">

                <label
                  htmlFor="profile-image"
                  className="inline-block cursor-pointer border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-red-700 hover:text-red-700"
                >
                  Choose Image
                </label>

                <input
                  id="profile-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Select an image from your device.
                </p>

              </div>

            </div>

          </div>


          {/* =========================
              NAME
          ========================== */}

          <div className="mt-6">

            <label
              htmlFor="full-name"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
            >
              Full Name
            </label>

            <input
              id="full-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-slate-300 bg-[#FAF9F6] px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-red-700 focus:bg-white"
              placeholder="Enter your full name"
            />

          </div>


          {/* =========================
              ACTIONS
          ========================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUpdating
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default UpdateUserProfile;