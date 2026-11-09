import React, { useState } from "react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Apps", href: "/apps" },
  { label: "MyProfile", href: "/myprofile" },
];

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

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
            <span className="grid h-10 w-10 -rotate-6 place-items-center rounded-lg border-2 border-emerald-900 bg-yellow-300 text-xl font-black text-emerald-900 transition-transform duration-200 group-hover:rotate-0 motion-reduce:transition-none">
              S
            </span>
            <span className="text-2xl font-extrabold tracking-tight text-emerald-900">
              Sojib
            </span>
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
                    {/* yellow highlighter mark */}
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

          {/* RIGHT: Login + mobile button */}
          <div className="flex items-center justify-end gap-2 col-start-3">
            <a
              href="/login"
              className="rounded-xl border-2 border-emerald-900 bg-emerald-600 px-5 py-2 text-lg font-bold text-white shadow-[3px_3px_0_0_#064e3b] transition-all duration-150 hover:bg-emerald-500 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-900 motion-reduce:transition-none"
            >
              Login
            </a>

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

        {/* Mobile menu */}
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
                    active === label ? "bg-yellow-300" : "hover:bg-emerald-50"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
