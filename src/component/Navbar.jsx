
"use client";

import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  if (isPending) {
    return null;
  }

  const isLoggedIn = !!session?.user;

  return (
    <div className="bg-white py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Left Navigation */}
        <ul className="flex items-center gap-4">

          {/* Always visible */}
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/ideas">Ideas</Link>
          </li>

          {/* Only logged in */}
          {isLoggedIn && (
            <>
              <li>
                <Link href="/my-ideas">
                  My Ideas
                </Link>
              </li>

              <li>
                <Link href="/my-interection">
                  My Interaction
                </Link>
              </li>

              <li>
                <Link href="/add-ideas">
                  Add Ideas
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Logo */}
        <div>
          <Link href="/">
            <Image
              src="/assets/logo.png"
              height={120}
              width={120}
              alt="IdeaVault Logo"
            />
          </Link>
        </div>

        {/* Right Navigation */}
        <ul className="flex items-center gap-4">

          {isLoggedIn ? (
            <>
              {/* Logged in */}
              <li>
                <Link href="/profile">
                  Profile
                </Link>
              </li>

              <li>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Logged out */}
              <li>
                <Link href="/signup">
                  Sign Up
                </Link>
              </li>

              <li>
                <Link href="/login">
                  Login
                </Link>
              </li>
            </>
          )}

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

