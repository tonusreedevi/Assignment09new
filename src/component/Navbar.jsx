
"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <div className="bg-white py-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between">

        {/* Left Navigation */}
        <ul className="flex items-center gap-3">
          <li>
            <Link href="/">Home</Link>
          </li>

          <li>
            <Link href="/ideas">Ideas</Link>
          </li>

          {user && (
            <>
              <li>
                <Link href="/my-ideas">My Ideas</Link>
              </li>

              <li>
                <Link href="/my-interection">
                  My Interaction
                </Link>
              </li>

              <li>
                <Link href="/add-ideas">Add Ideas</Link>
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
        <ul className="flex items-center gap-3">

          {user ? (
            <>
              {/* Profile */}
              <li>
                <Link href="/profile">
                  Profile
                </Link>
              </li>

              {/* Avatar */}
              <li>
                <Link href="/profile">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user.name || "User"}
                      src={user.image || undefined}
                    />

                    <Avatar.Fallback>
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Link>
              </li>

              {/* Logout */}
              <li>
                <Button
                  size="sm"
                  onClick={handleSignOut}
                  variant="danger"
                  className="rounded-none"
                >
                  Logout
                </Button>
              </li>
            </>
          ) : (
            <>
              {/* Login */}
              <li>
                <Link href="/login">Login</Link>
              </li>

              {/* Sign Up */}
              <li>
                <Link href="/signup">Sign Up</Link>
              </li>
            </>
          )}

        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

