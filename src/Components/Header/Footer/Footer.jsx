import React, { useState } from "react";
import { Link } from "react-router";
import {
  FaLeaf,
  FaHome,
  FaEnvelope,
  FaAppStore,
  FaUser,
  FaSignInAlt,
  FaShieldAlt,
  FaFileContract,
  FaCode,
  FaTwitter,
  FaYoutube,
  FaFacebookF,
  FaGithub,
  FaArrowRight,
  FaPaperPlane,
  FaHeart,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  // Social media (external links)
  const socialLinks = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com/share/194z9YXrfs/", label: "Facebook" },
    { icon: <FaTwitter />, link: "https://twitter.com", label: "Twitter" },
    { icon: <FaYoutube />, link: "https://youtube.com", label: "YouTube" },
    { icon: <FaGithub />, link: "https://github.com/MdShajalalsojib", label: "GitHub" },
  ];

  // Internal links (only pages that exist in your router)
  const quickLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Explore Apps", path: "/apps", icon: <FaAppStore /> },
    { name: "My Profile", path: "/myprofile", icon: <FaUser /> },
    { name: "Login", path: "/login", icon: <FaSignInAlt /> },
  ];

  const categories = [
    { name: "Productivity Apps", path: "/apps" },
    { name: "Healthcare Apps", path: "/apps" },
    { name: "Education Apps", path: "/apps" },
    { name: "Trending Apps", path: "/apps" },
  ];

  // External links required by the assignment
  // (replace these URLs with your own pages if you have them)
  const legalLinks = [
    {
      name: "Terms of Service",
      href: "https://policies.google.com/terms",
      icon: <FaFileContract />,
    },
    {
      name: "Privacy Policy",
      href: "https://policies.google.com/privacy",
      icon: <FaShieldAlt />,
    },
    {
      name: "Developer Resources",
      href: "https://developer.android.com",
      icon: <FaCode />,
    },
    {
      name: "Contact Support",
      href: "mailto:support@appstore.com",
      icon: <FaEnvelope />,
      mail: true,
    },
  ];

  const linkClass =
    "group flex items-center gap-3 text-sm text-emerald-100/80 transition hover:translate-x-1 hover:text-yellow-300 motion-reduce:transition-none";

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:px-10">
        {/* Newsletter banner */}
        <div className="relative mb-16 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-7 shadow-2xl backdrop-blur-md sm:p-10">
          <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full bg-yellow-300/10 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/20 bg-yellow-300/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-yellow-300">
                <FaPaperPlane />
                Stay Updated
              </span>

              <h2 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">
                Get the Latest
                <span className="text-yellow-300"> App Updates.</span>
              </h2>

              <p className="mt-3 leading-7 text-emerald-100">
                Subscribe to our newsletter and discover new applications,
                exciting features, and the latest technology updates.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-sm text-white outline-none placeholder:text-emerald-200 focus:border-yellow-300 focus:ring-2 focus:ring-yellow-300/20"
                />

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-yellow-300 px-6 py-4 font-extrabold text-emerald-950 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-200 motion-reduce:transition-none"
                >
                  Subscribe
                  <FaArrowRight />
                </button>
              </form>

              <p
                aria-live="polite"
                className={`mt-3 text-sm font-semibold text-yellow-300 transition-opacity ${
                  subscribed ? "opacity-100" : "opacity-0"
                }`}
              >
                Thank you for subscribing!
              </p>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-300 text-3xl text-emerald-950 shadow-lg">
                <FaLeaf />
              </div>

              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  App<span className="text-yellow-300">Store</span>
                </h2>
                <p className="text-xs font-medium tracking-[0.2em] text-emerald-200">
                  DISCOVER MORE
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-emerald-100/80">
              Your ultimate destination for discovering amazing applications.
              Explore productivity, healthcare, and educational apps designed
              to make your digital life better.
            </p>

            {/* Social media */}
            <div className="mt-7">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-yellow-300">
                Follow Our Community
              </h3>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} (opens in a new tab)`}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-lg text-white transition-all duration-300 hover:-translate-y-1 hover:border-yellow-300 hover:bg-yellow-300 hover:text-emerald-950 motion-reduce:transition-none"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-6 text-lg font-extrabold text-white">
              Quick Links
            </h3>
            <div className="mb-6 h-1 w-12 rounded-full bg-yellow-300" />

            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={linkClass}>
                    <span className="text-emerald-300 transition group-hover:text-yellow-300">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-6 text-lg font-extrabold text-white">
              Categories
            </h3>
            <div className="mb-6 h-1 w-12 rounded-full bg-yellow-300" />

            <ul className="space-y-4">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className={linkClass}>
                    <FaArrowRight className="text-xs text-emerald-300 transition group-hover:text-yellow-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal and resources (external links) */}
          <div>
            <h3 className="mb-6 text-lg font-extrabold text-white">
              Legal &amp; Resources
            </h3>
            <div className="mb-6 h-1 w-12 rounded-full bg-yellow-300" />

            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    {...(item.mail
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className={linkClass}
                  >
                    <span className="text-emerald-300 transition group-hover:text-yellow-300">
                      {item.icon}
                    </span>
                    {item.name}
                    {!item.mail && (
                      <FaExternalLinkAlt
                        aria-hidden="true"
                        className="text-[10px] opacity-60"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col items-center justify-between gap-5 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-emerald-100/70">
            © {new Date().getFullYear()} AppStore. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-emerald-100/70">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-yellow-300"
            >
              Privacy Policy
            </a>

            <span className="h-4 w-px bg-white/20" />

            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-yellow-300"
            >
              Terms of Service
            </a>

            <span className="h-4 w-px bg-white/20" />

            <a
              href="https://developer.android.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-yellow-300"
            >
              Developer Resources
            </a>
          </div>

          <p className="flex items-center gap-2 text-sm text-emerald-100/70">
            Made with
            <FaHeart className="text-red-400" aria-hidden="true" />
            for app lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;