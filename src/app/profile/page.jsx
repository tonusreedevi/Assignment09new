"use client";

import { useState } from "react";
import UpdateUserProfile from "@/component/UpdateUserProfile";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const {
    data: session,
    isPending,
    refetch,
  } = authClient.useSession();

  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Loading
  if (isPending) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-2 w-2 animate-pulse rounded-full bg-red-700" />

            <p className="text-sm text-slate-500">
              Loading profile...
            </p>
          </div>
        </div>
      </main>
    );
  }

  const user = session?.user;

  // Not logged in
  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAF9F6]">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-8">

          <div className="max-w-xl">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
              IdeaVault
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
              Profile
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Please login to view and manage your profile.
            </p>

          </div>

        </div>
      </main>
    );
  }

  // Handle profile update
  const handleUpdateProfile = async (updatedData) => {
    try {
      setIsUpdating(true);

      await authClient.updateUser({
        name: updatedData.name,
        image: updatedData.image,
      });

      await refetch();

      setShowModal(false);

      console.log("Profile updated successfully!");

    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Get initials
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .trim()
      .split(" ")
      .slice(0, 2)
      .map((word) =>
        word.charAt(0).toUpperCase()
      )
      .join("");
  };

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* =========================
          PAGE HEADER
      ========================== */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
            My Profile
          </h1>

          <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
            Manage your personal information and account
            details on IdeaVault.
          </p>

        </div>

      </section>


      {/* =========================
          PROFILE CONTENT
      ========================== */}

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-8">

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">


          {/* =========================
              PROFILE SIDEBAR
          ========================== */}

          <div className="border border-slate-200 bg-white p-6">

            <div className="flex flex-col items-center text-center">

              {/* Avatar */}

              {user.image ? (

                <img
                  src={user.image}
                  alt={user.name || "Profile"}
                  className="h-28 w-28 rounded-full border border-slate-200 object-cover"
                />

              ) : (

                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-slate-950 text-3xl font-semibold text-white">
                  {getInitials(user.name)}
                </div>

              )}

              {/* Name */}

              <h2 className="mt-5 text-xl font-semibold text-slate-950">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>

              {/* Status */}

              <div className="mt-5">

                {user.emailVerified ? (

                  <span className="inline-flex items-center gap-2 border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                    Email Verified
                  </span>

                ) : (

                  <span className="inline-flex items-center gap-2 border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Not Verified
                  </span>

                )}

              </div>

            </div>

          </div>


          {/* =========================
              ACCOUNT INFORMATION
          ========================== */}

          <div className="border border-slate-200 bg-white">

            {/* Header */}

            <div className="border-b border-slate-200 px-6 py-5">

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                Account Information
              </p>

              <h2 className="mt-1 text-xl font-semibold text-slate-950">
                Personal Details
              </h2>

            </div>


            {/* Information */}

            <div className="divide-y divide-slate-200">

              {/* Name */}

              <div className="px-6 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Full Name
                </p>

                <p className="mt-2 text-sm font-medium text-slate-900">
                  {user.name}
                </p>

              </div>


              {/* Email */}

              <div className="px-6 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Email Address
                </p>

                <p className="mt-2 break-all text-sm font-medium text-slate-900">
                  {user.email}
                </p>

              </div>


              {/* Verification */}

              <div className="px-6 py-5">

                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                  Email Verification
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <span
                    className={`h-2 w-2 rounded-full ${
                      user.emailVerified
                        ? "bg-green-600"
                        : "bg-amber-500"
                    }`}
                  />

                  <p
                    className={`text-sm font-medium ${
                      user.emailVerified
                        ? "text-green-700"
                        : "text-amber-600"
                    }`}
                  >
                    {user.emailVerified
                      ? "Verified"
                      : "Not Verified"}
                  </p>

                </div>

              </div>

            </div>


            {/* Actions */}

            <div className="border-t border-slate-200 bg-[#FAF9F6] px-6 py-5">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-sm font-semibold text-slate-900">
                    Profile Settings
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Update your name or profile image.
                  </p>

                </div>

                <button
                  onClick={() => setShowModal(true)}
                  disabled={isUpdating}
                  className="bg-red-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isUpdating
                    ? "Updating..."
                    : "Edit Profile"}
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          UPDATE MODAL
      ========================== */}

      {showModal && (
        <UpdateUserProfile
          user={user}
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdateProfile}
          isUpdating={isUpdating}
        />
      )}

    </main>
  );
};

export default ProfilePage;