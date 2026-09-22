"use client";

import { useState } from "react";

const UpdateUserProfile = ({ user, onClose, onUpdate, isUpdating }) => {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [previewImage, setPreviewImage] = useState(user.image || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImage(reader.result); // This will be the base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ name, image });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-[#0B3D6F] mb-6">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Profile Image Preview */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div
                  className="w-24 h-24 rounded-full bg-[#F46C06]
                  text-white flex items-center justify-center
                  text-3xl font-bold"
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#F46C06] file:text-white
                hover:file:bg-[#d85b03]"
            />
          </div>


          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#F46C06]
                focus:border-transparent"
              required
            />
          </div>


          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-full
                bg-gray-200 text-gray-700 font-semibold
                hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 px-4 py-2 rounded-full
                bg-[#F46C06] text-white font-semibold
                hover:bg-[#d85b03] transition
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;