"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
         

          <div className="hidden sm:block">
       <p className="text-[20px] font-semibold tracking-[-0.045em] leading-none text-slate-950">
  <span>Idea</span>
  <span className="font-black text-[#4A90E2]">Vault</span>
  <span className="ml-1 text-[#88BDF2]">.</span>
</p>

           
          </div>
        </Link>


        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">

          <Link
            href="/"
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#88BDF2]/10 hover:text-slate-950"
          >
            Home
          </Link>

          <Link
            href="/ideas"
            className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#88BDF2]/10 hover:text-slate-950"
          >
            Ideas
          </Link>

          {user && (
            <>
              <Link
                href="/my-ideas"
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#88BDF2]/10 hover:text-slate-950"
              >
                My Ideas
              </Link>

              <Link
                href="/my-interaction"
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#88BDF2]/10 hover:text-slate-950"
              >
                My Interaction
              </Link>

              <Link
                href="/add-ideas"
                className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-[#88BDF2]/10 hover:text-slate-950"
              >
                Add Idea
              </Link>
            </>
          )}
        </div>


        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-3">

          {user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 transition hover:border-[#88BDF2]"
              >
                <Avatar className="h-8 w-8">
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

                <span className="max-w-[100px] truncate text-sm font-medium text-slate-700">
                  {user.name || "Profile"}
                </span>
              </Link>

              <Button
                size="sm"
                onClick={handleSignOut}
                className="rounded-md bg-slate-950 px-4 text-white hover:bg-[#88BDF2] hover:text-slate-950"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="bg-[#88BDF2] px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-[#a5d0f8]"
              >
                Sign Up
              </Link>
            </>
          )}

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex h-10 w-10 items-center justify-center border border-slate-200 text-xl text-slate-950"
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "☰"}
        </button>

      </nav>


      {/* ================= MOBILE MENU ================= */}
      {menuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-5">

          <div className="flex flex-col gap-1">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
            >
              Home
            </Link>

            <Link
              href="/ideas"
              onClick={() => setMenuOpen(false)}
              className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
            >
              Ideas
            </Link>

            {user && (
              <>
                <Link
                  href="/my-ideas"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
                >
                  My Ideas
                </Link>

                <Link
                  href="/my-interaction"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
                >
                  My Interaction
                </Link>

                <Link
                  href="/add-ideas"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
                >
                  Add Idea
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700"
                >
                  Profile
                </Link>

                <button
                  onClick={handleSignOut}
                  className="mt-3 w-full bg-slate-950 py-3 text-sm font-semibold text-white transition hover:bg-[#88BDF2] hover:text-slate-950"
                >
                  Logout
                </button>
              </>
            )}

            {!user && (
              <div className="grid grid-cols-2 gap-3 pt-4">

                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="border border-slate-300 py-3 text-center text-sm font-semibold text-slate-700"
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#88BDF2] py-3 text-center text-sm font-semibold text-slate-950"
                >
                  Sign Up
                </Link>

              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;