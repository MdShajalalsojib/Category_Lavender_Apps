import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    document.title = "Login | AppStore";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Connect your Firebase authentication here.
    console.log({ email, password, remember });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-100 px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-2xl md:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-10 text-white md:flex">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-300 text-2xl font-black text-emerald-950">
                A
              </div>

              <span className="text-2xl font-black">AppStore</span>
            </Link>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-6xl shadow-xl backdrop-blur-lg">
              📱
            </div>

            <h1 className="text-4xl font-black leading-tight">
              Discover Apps.
              <span className="block text-yellow-300">Explore More.</span>
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-emerald-100">
              Welcome to your favorite app destination. Discover amazing
              applications and make your digital experience better.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-2 w-10 rounded-full bg-yellow-300" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
              <span className="h-2 w-2 rounded-full bg-white/40" />
            </div>
          </div>

          <div className="relative z-10 border-t border-white/20 pt-5 text-sm text-emerald-100">
            © 2026 AppStore. All rights reserved.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <Link to="/" className="mb-10 flex items-center gap-3 md:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-800 text-xl font-black text-white">
                A
              </div>

              <span className="text-2xl font-black text-emerald-950">
                AppStore
              </span>
            </Link>

            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
                Welcome Back
              </span>

              <h2 className="mt-3 text-3xl font-black text-emerald-950 sm:text-4xl">
                Login to Your Account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Please enter your details to access your account.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <span className="mr-3 text-lg text-emerald-700">✉</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-transparent py-4 text-sm text-gray-800 outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-bold text-gray-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-950"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <span className="mr-3 text-lg text-emerald-700">🔒</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-transparent py-4 text-sm text-gray-800 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-xs font-bold text-emerald-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  id="remember"
                  className="h-4 w-4 accent-emerald-700"
                />

                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </label>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-emerald-800 py-4 font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-950 hover:shadow-xl"
              >
                Login to Account →
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="ml-1 font-extrabold text-emerald-700 hover:text-emerald-950"
                >
                  Create Account
                </Link>
              </p>
            </div>

            <div className="mt-8 border-t border-gray-100 pt-6 text-center">
              <Link
                to="/apps"
                className="text-sm font-semibold text-gray-500 transition hover:text-emerald-700"
              >
                ← Continue Exploring Apps
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
