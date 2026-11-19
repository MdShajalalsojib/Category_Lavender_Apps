import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMobileAlt,
  FaPen,
  FaShieldAlt,
  FaSignOutAlt,
  FaStar,
  FaUser,
} from "react-icons/fa";
import { auth } from "../../Firebase/Firebase.init";
import apps from "../../data/apps.json";

const ProfileField = ({ icon: Icon, label, children }) => (
  <div>
    <label className="mb-2 flex items-center gap-2 text-sm font-bold text-emerald-950">
      <Icon className="text-emerald-700" aria-hidden="true" />
      {label}
    </label>
    {children}
  </div>
);

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", location: "", bio: "" });
  const [activity, setActivity] = useState({ installed: 0, reviews: 0 });

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (!currentUser) {
      navigate("/login", { replace: true });
      return;
    }

    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem(`profile-${currentUser.uid}`) || "{}");
    } catch {
      saved = {};
    }

    setProfile({
      name: saved.name ?? currentUser.displayName ?? "",
      email: currentUser.email ?? "",
      phone: saved.phone ?? "",
      location: saved.location ?? "",
      bio: saved.bio ?? "",
    });
    setActivity({
      installed: apps.filter((app) => localStorage.getItem(`installed-${app.id}`) === "true").length,
      reviews: apps.reduce((count, app) => {
        try {
          return count + JSON.parse(localStorage.getItem(`reviews-${app.id}`) || "[]").length;
        } catch {
          return count;
        }
      }, 0),
    });
  }), [navigate]);

  const handleChange = (event) => {
    setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));
    setSavedMessage(false);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!user) return;

    const nextProfile = { ...profile, name: profile.name.trim() };
    const { name, phone, location, bio } = nextProfile;
    localStorage.setItem(`profile-${user.uid}`, JSON.stringify({ name, phone, location, bio }));
    setProfile(nextProfile);

    if (name && name !== user.displayName) {
      try {
        await updateProfile(user, { displayName: name });
        setUser({ ...user, displayName: name });
      } catch (error) {
        console.error("Could not update account name:", error);
      }
    }

    setIsEditing(false);
    setSavedMessage(true);
  };

  const handleCancel = () => {
    if (user) {
      let saved = {};
      try {
        saved = JSON.parse(localStorage.getItem(`profile-${user.uid}`) || "{}");
      } catch {
        saved = {};
      }
      setProfile({
        name: saved.name ?? user.displayName ?? "",
        email: user.email ?? "",
        phone: saved.phone ?? "",
        location: saved.location ?? "",
        bio: saved.bio ?? "",
      });
    }
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  const completedFields = [profile.name, profile.email, profile.phone, profile.location, profile.bio].filter(Boolean).length;
  const completion = Math.round((completedFields / 5) * 100);
  const joinedDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString(undefined, { month: "long", year: "numeric" })
    : "New member";
  const inputClass = `w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition ${
    isEditing
      ? "border-emerald-200 bg-white text-emerald-950 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
      : "border-transparent bg-emerald-50/70 text-gray-600"
  }`;

  return (
    <main className="min-h-screen bg-[#f5f8f5] px-4 py-9 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-emerald-700">Your account</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-emerald-950 sm:text-4xl">My Profile</h1>
            <p className="mt-2 text-sm text-gray-500">Your personal details and AppStore activity, all in one place.</p>
          </div>
          <Link to="/apps" className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-bold text-emerald-900 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-400">
            Explore apps <FaArrowRight className="text-xs" />
          </Link>
        </header>

        <section className="relative isolate overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#063e31] via-emerald-800 to-[#08745a] p-6 text-white shadow-xl sm:p-9">
          <div className="absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-yellow-300/15 blur-3xl" />
          <div className="absolute -bottom-36 left-1/3 -z-10 h-72 w-72 rounded-full bg-teal-300/10 blur-3xl" />
          <div className="flex flex-col gap-7 md:flex-row md:items-center">
            <div className="relative mx-auto md:mx-0">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={`${profile.name || "User"} profile`} className="h-28 w-28 rounded-[1.8rem] border-4 border-yellow-300 object-cover shadow-lg sm:h-32 sm:w-32" />
              ) : (
                <div className="grid h-28 w-28 place-items-center rounded-[1.8rem] border-4 border-yellow-300 bg-white text-5xl font-black text-emerald-900 shadow-lg sm:h-32 sm:w-32">
                  {profile.name.charAt(0).toUpperCase() || <FaUser className="text-4xl" />}
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 grid h-9 w-9 place-items-center rounded-full border-4 border-emerald-800 bg-yellow-300 text-emerald-950" aria-label="Verified account">
                <FaCheck className="text-xs" />
              </span>
            </div>

            <div className="min-w-0 flex-1 text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-yellow-200">
                <FaShieldAlt /> AppStore member
              </span>
              <h2 className="mt-3 truncate text-2xl font-black sm:text-3xl">{profile.name || "Welcome to AppStore"}</h2>
              <p className="mt-1 flex items-center justify-center gap-2 break-all text-sm text-emerald-100 md:justify-start">
                <FaEnvelope className="shrink-0" /> {profile.email}
              </p>
              <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-emerald-200 md:justify-start">
                <FaCalendarAlt /> Member since {joinedDate}
              </p>
            </div>

            <button type="button" onClick={() => { setIsEditing((editing) => !editing); setSavedMessage(false); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3 font-extrabold text-emerald-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-yellow-200">
              <FaPen className="text-sm" /> {isEditing ? "Editing profile" : "Edit profile"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-black/10 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-emerald-100"><FaMobileAlt className="text-yellow-300" /> Installed apps</p>
              <p className="mt-2 text-2xl font-black">{activity.installed}</p>
            </div>
            <div className="rounded-2xl bg-black/10 p-4">
              <p className="flex items-center gap-2 text-xs font-semibold text-emerald-100"><FaStar className="text-yellow-300" /> Reviews shared</p>
              <p className="mt-2 text-2xl font-black">{activity.reviews}</p>
            </div>
            <div className="col-span-2 rounded-2xl bg-black/10 p-4 sm:col-span-1">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-100">
                <span>Profile completion</span><span className="text-yellow-200">{completion}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-yellow-300 transition-all" style={{ width: `${completion}%` }} />
              </div>
            </div>
          </div>
        </section>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <h2 className="text-xl font-black text-emerald-950">Personal information</h2>
                <p className="mt-1 text-sm text-gray-500">Keep your profile details up to date.</p>
              </div>
              {savedMessage && <span role="status" className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800"><FaCheck /> Changes saved</span>}
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <ProfileField icon={FaUser} label="Full name">
                  <input className={inputClass} type="text" name="name" value={profile.name} onChange={handleChange} disabled={!isEditing} placeholder="Your name" maxLength={80} />
                </ProfileField>
                <ProfileField icon={FaEnvelope} label="Email address">
                  <input className={`${inputClass} cursor-not-allowed`} type="email" value={profile.email} disabled readOnly />
                </ProfileField>
                <ProfileField icon={FaMobileAlt} label="Phone number">
                  <input className={inputClass} type="tel" name="phone" value={profile.phone} onChange={handleChange} disabled={!isEditing} placeholder="Add a phone number" maxLength={30} />
                </ProfileField>
                <ProfileField icon={FaMapMarkerAlt} label="Location">
                  <input className={inputClass} type="text" name="location" value={profile.location} onChange={handleChange} disabled={!isEditing} placeholder="City, country" maxLength={80} />
                </ProfileField>
              </div>

              <ProfileField icon={FaPen} label="About me">
                <textarea className={`${inputClass} resize-none`} name="bio" value={profile.bio} onChange={handleChange} disabled={!isEditing} placeholder="Write a little about yourself..." rows={4} maxLength={300} />
                {isEditing && <p className="mt-1 text-right text-xs text-gray-400">{profile.bio.length}/300</p>}
              </ProfileField>

              {isEditing && (
                <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-5">
                  <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white shadow-sm transition hover:bg-emerald-950"><FaCheck /> Save changes</button>
                  <button type="button" onClick={handleCancel} className="rounded-xl border border-gray-200 px-6 py-3 font-bold text-gray-600 transition hover:bg-gray-50">Cancel</button>
                </div>
              )}
            </form>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-lg font-black text-emerald-950">Account settings</h2>
              <p className="mt-1 text-sm text-gray-500">Quick links for your account.</p>
              <div className="mt-5 space-y-2">
                <Link to="/apps" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-800"><FaMobileAlt /></span>
                  Explore apps <FaArrowRight className="ml-auto text-xs text-emerald-600 transition group-hover:translate-x-1" />
                </Link>
                <Link to="/" className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-50">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-100 text-emerald-800"><FaArrowRight /></span>
                  Back to home <FaArrowRight className="ml-auto text-xs text-emerald-600 transition group-hover:translate-x-1" />
                </Link>
                <button type="button" onClick={handleLogout} className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-red-700 transition hover:bg-red-50">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-red-100"><FaSignOutAlt /></span>
                  Sign out <FaArrowRight className="ml-auto text-xs transition group-hover:translate-x-1" />
                </button>
              </div>
            </section>

            <section className="overflow-hidden rounded-[1.75rem] bg-emerald-950 p-6 text-white shadow-lg">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-yellow-300 text-emerald-950"><FaShieldAlt /></div>
              <h2 className="mt-4 text-lg font-black">Your account is secure</h2>
              <p className="mt-2 text-sm leading-6 text-emerald-100">You are signed in with Google. Your email is managed by your Google account.</p>
              <div className="mt-5 flex items-center gap-2 text-xs font-bold text-yellow-200"><FaCheck /> Google account connected</div>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default MyProfile;
