import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import apps from "../../data/apps.json";

const AppDetails = () => {
  const { id } = useParams();

  const app = apps.find((item) => String(item.id) === String(id));

  const [installed, setInstalled] = useState(() => {
    return localStorage.getItem(`installed-${id}`) === "true";
  });

  const [reviews, setReviews] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`reviews-${id}`) || "[]");
    } catch {
      return [];
    }
  });

  const [reviewer, setReviewer] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (app) {
      document.title = `${app.name} | App Details`;
    }
  }, [app]);

  // Install / Uninstall
  const handleInstall = () => {
    const newStatus = !installed;

    setInstalled(newStatus);

    localStorage.setItem(`installed-${id}`, String(newStatus));
  };

  // Submit Review
  const handleReview = (e) => {
    e.preventDefault();

    if (!reviewer.trim() || !comment.trim()) {
      return;
    }

    const newReview = {
      id: Date.now(),
      reviewer: reviewer.trim(),
      comment: comment.trim(),
      rating,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [newReview, ...reviews];

    setReviews(updatedReviews);

    localStorage.setItem(`reviews-${id}`, JSON.stringify(updatedReviews));

    setReviewer("");
    setComment("");
    setRating(5);
  };

  // App Not Found
  if (!app) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h2 className="text-4xl font-black text-emerald-950">App Not Found!</h2>

        <p className="mt-3 text-gray-500">
          Sorry, this application does not exist.
        </p>

        <Link
          to="/apps"
          className="mt-6 rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900"
        >
          Back to Apps
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50/70 via-white to-white">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link
          to="/apps"
          className="inline-flex items-center gap-2 font-semibold text-emerald-700 transition hover:text-emerald-950"
        >
          ← Back to Apps
        </Link>

        {/* App Information */}
        <section className="overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-lg">
          <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[280px_1fr] md:items-center">
            {/* App Image */}
            <div className="overflow-hidden rounded-3xl bg-emerald-50 shadow-md">
              <img
                src={app.thumbnail}
                alt={app.name}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* App Details */}
            <div>
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
                {app.category}
              </span>

              <h1 className="mt-5 text-3xl font-black text-emerald-950 sm:text-4xl">
                {app.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <span className="font-bold text-yellow-500">
                  ★ {app.rating} / 5
                </span>

                <span className="text-sm text-gray-500">
                  {app.downloads?.toLocaleString("en-US") || 0} Downloads
                </span>
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-bold text-emerald-950">
                  About This App
                </h2>

                <p className="mt-3 leading-7 text-gray-600">
                  {app.description ||
                    `Explore ${app.name}, an application in the ${app.category} category. Discover its features and see how it can make your everyday life easier.`}
                </p>
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                className={`mt-8 w-full rounded-xl px-8 py-4 text-lg font-extrabold shadow-lg transition-all duration-300 hover:-translate-y-1 sm:w-auto ${
                  installed
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-emerald-800 text-white hover:bg-emerald-900"
                }`}
              >
                {installed ? "✓ Installed — Uninstall" : "↓ Install"}
              </button>

              <p className="mt-3 text-sm text-gray-400">
                {installed
                  ? "This app is currently installed."
                  : "Click Install to add this app to your installed list."}
              </p>
            </div>
          </div>
        </section>

        {/* Review Form */}
        <section className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-md sm:p-10">
          <div className="mb-7">
            <span className="text-sm font-bold uppercase tracking-widest text-emerald-600">
              Share Your Experience
            </span>

            <h2 className="mt-2 text-2xl font-black text-emerald-950 sm:text-3xl">
              Write a Review
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tell other users what you think about this app.
            </p>
          </div>

          <form onSubmit={handleReview} className="space-y-6">
            {/* Star Rating */}
            <div>
              <label className="mb-3 block font-bold text-gray-800">
                Your Rating
              </label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`Rate ${star} out of 5`}
                    className={`text-3xl transition-transform hover:scale-125 ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Reviewer Name */}
            <div>
              <label className="mb-2 block font-bold text-gray-800">
                Your Name
              </label>

              <input
                type="text"
                value={reviewer}
                onChange={(e) => setReviewer(e.target.value)}
                placeholder="Enter your name"
                required
                maxLength={60}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-gray-500"
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="mb-2 block font-bold text-gray-800">
                Your Review
              </label>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your experience about this app..."
                required
                maxLength={1000}
                rows={5}
                className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 text-gray-500"
              />
            </div>

            <p className="text-xs text-gray-400">
              By submitting your review, you agree to share your feedback
              publicly.
            </p>

            {/* Submit */}
            <button
              type="submit"
              className="rounded-xl bg-emerald-800 px-8 py-3.5 font-bold text-shadow-green-500 shadow-md transition-all hover:-translate-y-1 hover:bg-emerald-900"
            >
              Submit Review →
            </button>
          </form>
        </section>

        {/* Submitted Reviews */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-5">
            <div>
              <h2 className="text-2xl font-black text-emerald-950 sm:text-3xl">
                User Reviews
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Real feedback from app users.
              </p>
            </div>

            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-800">
              {reviews.length} Reviews
            </span>
          </div>

          {reviews.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-black text-emerald-800">
                        {review.reviewer.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <h3 className="font-bold text-emerald-950">
                          {review.reviewer}
                        </h3>

                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>

                    <span className="whitespace-nowrap font-bold text-yellow-500">
                      ★ {review.rating}/5
                    </span>
                  </div>

                  <p className="mt-5 leading-7 text-gray-600">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-white py-12 text-center">
              <div className="text-4xl">💬</div>

              <h3 className="mt-4 text-xl font-bold text-emerald-950">
                No Reviews Yet
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Be the first person to review this application!
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AppDetails;
