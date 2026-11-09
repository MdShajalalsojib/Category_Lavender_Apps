
import React, { useState } from "react";
import { Link } from "react-router";

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Md. Shajalal",
    email: "shajalal@gmail.com",
    phone: "+880 1XXXXXXXXX",
    location: "Dhaka, Bangladesh",
    bio: "Passionate about technology, applications and digital innovation.",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-white px-4 py-10 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl space-y-8">

        {/* Page Heading */}
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
            My Account
          </span>

          <h1 className="mt-2 text-3xl font-black text-emerald-950 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Header */}
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 p-6 text-white shadow-xl sm:p-10">

          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center gap-6 sm:flex-row">

            {/* Profile Image */}
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-yellow-300 bg-white text-4xl font-black text-emerald-900 shadow-xl">
              MS
            </div>

            {/* User Information */}
            <div className="flex-1 text-center sm:text-left">
              <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-emerald-950">
                Premium Member
              </span>

              <h2 className="mt-3 text-3xl font-black">
                {profile.name}
              </h2>

              <p className="mt-2 text-emerald-100">
                {profile.email}
              </p>

              <p className="mt-1 text-sm text-emerald-200">
                Member since November 2026
              </p>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-xl bg-yellow-300 px-6 py-3 font-bold text-emerald-950 shadow-lg transition hover:-translate-y-1 hover:bg-yellow-200"
            >
              {isEditing ? "Cancel Editing" : "✎ Edit Profile"}
            </button>

          </div>
        </section>

        {/* Statistics */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          {[
            { icon: "📱", value: "08", label: "Installed Apps" },
            { icon: "⭐", value: "12", label: "Reviews Submitted" },
            { icon: "❤️", value: "05", label: "Favorite Apps" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-black text-emerald-900">
                    {item.value}
                  </p>
                  <p className="mt-2 font-semibold text-gray-500">
                    {item.label}
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-3xl">
                  {item.icon}
                </div>
              </div>
            </div>
          ))}

        </section>

        {/* Profile Information */}
        <section className="grid gap-7 lg:grid-cols-3">

          {/* Personal Information */}
          <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm lg:col-span-2 sm:p-8">

            <div className="mb-7 border-b border-gray-100 pb-5">
              <h2 className="text-2xl font-black text-emerald-950">
                Personal Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Your personal details and contact information.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">

                {/* Full Name */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed text-gray-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed text-gray-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed text-gray-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="mb-2 block text-sm font-bold text-gray-700">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed text-gray-500"
                  />
                </div>

              </div>

              {/* Bio */}
              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  About Me
                </label>

                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed text-gray-500"
                />
              </div>

              {isEditing && (
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-xl bg-emerald-800 px-7 py-3 font-bold text-white transition hover:bg-emerald-950"
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="rounded-xl border border-gray-200 px-7 py-3 font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              )}

            </form>
          </div>

          {/* Account Settings */}
          <div className="space-y-6">

            <div className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-black text-emerald-950">
                Account Settings
              </h2>

              <div className="space-y-3">

                <Link
                  to="/apps"
                  className="flex items-center gap-3 rounded-xl p-3 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <span className="text-xl">📱</span>
                  <span className="font-semibold">Explore Apps</span>
                  <span className="ml-auto">→</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center gap-3 rounded-xl p-3 text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <span className="text-xl">🏠</span>
                  <span className="font-semibold">Home Page</span>
                  <span className="ml-auto">→</span>
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-3 rounded-xl p-3 text-red-600 transition hover:bg-red-50"
                >
                  <span className="text-xl">↪</span>
                  <span className="font-semibold">Logout</span>
                  <span className="ml-auto">→</span>
                </Link>

              </div>
            </div>

            {/* Account Status */}
            <div className="rounded-3xl bg-emerald-950 p-6 text-white shadow-lg">
              <div className="text-3xl">🛡️</div>

              <h3 className="mt-4 text-xl font-bold">
                Account Security
              </h3>

              <p className="mt-2 text-sm leading-6 text-emerald-200">
                Keep your account information updated and protect your personal details.
              </p>

              <span className="mt-5 inline-block rounded-full bg-emerald-500/20 px-4 py-2 text-xs font-bold text-emerald-200">
                ● Account Active
              </span>
            </div>

          </div>
        </section>

        
      </div>
    </main>
  );
};

export default MyProfile;
