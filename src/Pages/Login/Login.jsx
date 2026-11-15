 
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

import {
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiX,
  FiUser,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMenuOpen(false);
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Apps", path: "/apps" },
    { name: "My Profile", path: "/my-profile" },
  ];

  const linkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              <HiOutlineSparkles className="text-white text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
                App<span className="text-blue-600">Zone</span>
              </h1>
              <p className="text-[10px] text-gray-400 font-semibold tracking-[2px]">
                DISCOVER YOUR APPS
              </p>
            </div>

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1.5 rounded-full border border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkStyle}
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Authentication */}
          <div className="hidden md:flex items-center gap-3">

            {loading ? (
              <div className="w-24 h-10 rounded-full bg-gray-100 animate-pulse"></div>
            ) : user ? (

              /* Logged In User */
              <div className="flex items-center gap-3">

                <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full pl-1.5 pr-4 py-1.5">

                  <img
                    src={
                      user.photoURL ||
                      "https://placehold.co/100x100?text=User"
                    }
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-500"
                  />

                  <div className="max-w-28">
                    <p className="text-sm font-bold text-gray-800 truncate">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-[10px] text-green-600 font-semibold">
                      Online
                    </p>
                  </div>

                </div>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-5 py-3 rounded-full text-sm font-bold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>

              </div>

            ) : (

              /* Not Logged In */
              <Link
                to="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <FiLogIn className="text-lg" />
                Login
              </Link>

            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            {menuOpen ? (
              <FiX className="text-2xl" />
            ) : (
              <FiMenu className="text-2xl" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 py-5 space-y-4">

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl font-semibold transition ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4">

              {loading ? (
                <div className="h-10 bg-gray-100 rounded-xl animate-pulse"></div>
              ) : user ? (

                <div className="space-y-3">

                  <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-xl">

                    <img
                      src={
                        user.photoURL ||
                        "https://placehold.co/100x100?text=User"
                      }
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                    />

                    <div className="min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">
                        {user.displayName || "User"}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold transition"
                  >
                    <FiLogOut />
                    Logout
                  </button>

                </div>

              ) : (

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-bold"
                >
                  <FiLogIn />
                  Login
                </Link>

              )}

            </div>

          </div>
        )}

      </nav>
    </header>
  );
};

export default Navbar;
