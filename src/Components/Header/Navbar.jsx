 
import React, { useState, useEffect } from "react";
import { FaLeaf } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../Firebase/Firebase.init";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "MyProfile", href: "/myprofile" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    try {
      setLoading(true);

      await signInWithPopup(auth, provider);
      setOpen(false);

    } catch (error) {
      console.error("Google Login Error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        console.log("Login popup was closed.");
      } else {
        alert(error.message);
      }

    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      await signOut(auth);
      setUser(null);
      setOpen(false);

    } catch (error) {
      console.error("Logout Error:", error);
      alert("Logout failed. Please try again.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-4 z-50 px-3">
      <nav
        aria-label="Main"
        className="mx-auto max-w-7xl rounded-2xl border-2 border-gray-400 bg-white px-4 py-3 shadow-[6px_6px_0_0_#064e3b]"
      >

        {/* 3 columns: logo left | links center | login right */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center">

          {/* LEFT: Logo */}
          <a
            href="/"
            onClick={() => setActive("Home")}
            className="group flex w-fit items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 rounded-lg"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-300 text-2xl text-emerald-950">
              <FaLeaf />
            </div>

            <h2 className="text-2xl font-black text-green-900">
              App<span className="text-yellow-500">Store</span>
            </h2>
          </a>

          {/* CENTER: Links (desktop) */}
          <ul className="hidden items-center gap-2 lg:flex">
            {LINKS.map(({ label, href }) => {
              const isActive = active === label;

              return (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setActive(label)}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative block px-4 py-2 text-lg font-semibold text-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900 rounded-lg"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2 bottom-1.5 -z-0 h-3 -skew-x-12 rounded-sm bg-yellow-300 transition-transform duration-300 origin-left motion-reduce:transition-none ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />

                    <span className="relative">{label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* RIGHT: Authentication + Mobile Button */}
          <div className="flex items-center justify-end gap-2 col-start-3">

            {/* Authentication Loading */}
            {authLoading ? (
              <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-200"></div>
            ) : user ? (

              /* Logged In: Profile + Logout */
              <div className="flex items-center gap-2">

                {/* Desktop Profile */}
                <div className="hidden sm:flex items-center gap-2 rounded-xl border-2 border-emerald-900 bg-yellow-50 px-2 py-1">

                  <img
                    src={user.photoURL || "https://placehold.co/80x80?text=User"}
                    alt="User Profile"
                    className="h-9 w-9 rounded-full border-2 border-emerald-700 object-cover"
                  />

                  <div className="max-w-24">
                    <p className="truncate text-sm font-bold text-emerald-950">
                      {user.displayName || "Google User"}
                    </p>
                    <p className="text-xs text-emerald-700">
                      Logged In
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex items-center gap-2 rounded-xl border-2 border-emerald-900 bg-red-500 px-3 sm:px-5 py-2 text-base sm:text-lg font-bold text-white shadow-[3px_3px_0_0_#064e3b] transition-all duration-150 hover:bg-red-600 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
                >
                  <FiLogOut />
                  <span className="hidden sm:inline">
                    {loading ? "Please wait..." : "Logout"}
                  </span>
                </button>

              </div>

            ) : (

              /* Logged Out: Login */
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="rounded-xl border-2 border-emerald-900 bg-emerald-600 px-4 sm:px-5 py-2 text-base sm:text-lg font-bold text-white shadow-[3px_3px_0_0_#064e3b] transition-all duration-150 hover:bg-emerald-500 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none disabled:opacity-60"
              >
                {loading ? "Loading..." : "Login"}
              </button>

            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-xl border-2 border-emerald-900 text-emerald-900 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <ul
            id="mobile-menu"
            className="mt-3 flex flex-col gap-2 border-t-2 border-emerald-900 pt-3 lg:hidden"
          >
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  onClick={() => {
                    setActive(label);
                    setOpen(false);
                  }}
                  className={`block rounded-lg px-4 py-2 text-lg font-semibold text-emerald-900 ${
                    active === label
                      ? "bg-yellow-300"
                      : "hover:bg-emerald-50"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            
            {/* Mobile User Profile */}
            {user && (
              <li className="mt-2 flex items-center gap-3 rounded-xl border-2 border-emerald-900 bg-yellow-50 p-3">
                <img
                  src={user.photoURL || "https://placehold.co/80x80?text=User"}
                  alt="Profile"
                  className="h-11 w-11 rounded-full border-2 border-emerald-700 object-cover"
                />

                <div className="min-w-0">
                  <p className="truncate font-bold text-emerald-950">
                    {user.displayName || "Google User"}
                  </p>
                  <p className="truncate text-xs text-emerald-700">
                    {user.email}
                  </p>
                </div>
              </li>
            )}

            {/* Mobile Authentication */}
            <li className="mt-2">
              {user ? (
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-900 bg-red-500 px-5 py-3 font-bold text-white shadow-[3px_3px_0_0_#064e3b] hover:bg-red-600 disabled:opacity-60"
                >
                  <FiLogOut />
                  {loading ? "Please wait..." : "Logout"}
                </button>
              ) : (
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full rounded-xl border-2 border-emerald-900 bg-emerald-600 px-5 py-3 font-bold text-white shadow-[3px_3px_0_0_#064e3b] hover:bg-emerald-500 disabled:opacity-60"
                >
                  {loading ? "Loading..." : "Login with Google"}
                </button>
              )}
            </li>
          </ul>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
