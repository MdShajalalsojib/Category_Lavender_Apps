import React, { useEffect } from "react";
import { Link } from "react-router";
import apps from "../../data/apps.json";

const CATEGORIES = ["Productivity", "Healthcare", "Education"];

/* ---------- App Card ---------- */
const AppCard = ({ app, rank }) => (
  <Link
    to={`/apps/${app.id}`}
    className="group block overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-xl"
  >
    <div className="relative overflow-hidden bg-emerald-50">
      <img
        src={app.thumbnail}
        alt={app.name}
        loading="lazy"
        className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold text-emerald-950 shadow-md">
        <span className="text-yellow-500">★</span>
        {app.rating}
      </span>

      {rank && (
        <span className="absolute bottom-2 right-3 text-6xl font-black italic text-white drop-shadow-lg">
          {String(rank).padStart(2, "0")}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-emerald-900/90 px-4 py-3 text-center text-sm font-bold text-white transition-transform duration-300 group-hover:translate-y-0">
        Explore App →
      </div>
    </div>

    <div className="p-4">
      <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
        {app.category}
      </span>

      <h3 className="mt-3 truncate text-lg font-extrabold text-emerald-950 transition-colors group-hover:text-emerald-600">
        {app.name}
      </h3>

      {rank && (
        <p className="mt-1 text-xs font-bold text-yellow-600">TOP {rank}</p>
      )}
    </div>
  </Link>
);

/* ---------- Section ---------- */
const Section = ({ title, subtitle, list, ranked, icon }) => (
  <section className="space-y-7">
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-emerald-100 pb-5">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
          {icon || "✦"}
        </div>

        <div>
          <h2 className="text-2xl font-black text-emerald-950 sm:text-3xl">
            {title}
          </h2>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>

      <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-800">
        {list.length} Apps
      </span>
    </div>

    {list.length > 0 ? (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {list.map((app, i) => (
          <AppCard key={app.id} app={app} rank={ranked ? i + 1 : undefined} />
        ))}
      </div>
    ) : (
      <p className="rounded-2xl bg-gray-50 py-10 text-center text-gray-500">
        No apps available in this category.
      </p>
    )}
  </section>
);

/* ---------- Store Statistics ---------- */
const Glance = () => {
  const totalDownloads = apps.reduce((sum, a) => sum + a.downloads, 0);

  const avg = apps.length
    ? (apps.reduce((sum, a) => sum + a.rating, 0) / apps.length).toFixed(1)
    : "0.0";

  const stats = [
    { value: apps.length, label: "Apps to Explore", icon: "📱" },
    { value: CATEGORIES.length, label: "Categories", icon: "🗂️" },
    {
      value: new Intl.NumberFormat("en", {
        notation: "compact",
      }).format(totalDownloads),
      label: "Total Downloads",
      icon: "⬇️",
    },
    { value: avg + " / 5", label: "Average Rating", icon: "⭐" },
  ];

  return (
    <section className="rounded-[2rem] bg-emerald-950 p-7 text-white shadow-xl sm:p-12">
      <div className="mb-9 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-yellow-300">
          Our Achievement
        </span>

        <h2 className="mt-3 text-3xl font-black sm:text-4xl">
          Our Store at a Glance
        </h2>

        <p className="mt-3 text-sm text-emerald-200">
          Discover our growing application collection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-white/10 bg-white/10 p-5 text-center transition-all hover:-translate-y-1 hover:bg-white/15"
          >
            <div className="text-3xl">{s.icon}</div>
            <p className="mt-3 text-3xl font-black text-yellow-300">
              {s.value}
            </p>
            <p className="mt-2 text-sm text-emerald-100">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ---------- Main Apps Page ---------- */
const Apps = () => {
  useEffect(() => {
    document.title = "Apps | AppStore";
  }, []);

  const trending = [...apps].sort((a, b) => b.rating - a.rating).slice(0, 4);

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/60 via-white to-white">
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <Section
          title="Trending Apps"
          subtitle="Discover the highest-rated applications"
          list={trending}
          ranked
          icon="🔥"
        />

        {CATEGORIES.map((cat, index) => (
          <Section
            key={cat}
            title={cat}
            subtitle={`Explore our ${cat.toLowerCase()} applications`}
            list={apps.filter((a) => a.category === cat)}
            icon={["⚡", "💚", "🎓"][index]}
          />
        ))}

        <Glance />
      </div>
    </main>
  );
};

export default Apps;
