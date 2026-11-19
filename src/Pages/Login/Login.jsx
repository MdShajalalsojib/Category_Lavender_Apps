import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../../Firebase/Firebase.init";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (auth.currentUser) navigate("/myprofile", { replace: true });
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
      navigate("/myprofile", { replace: true });
    } catch (loginError) {
      if (loginError.code !== "auth/popup-closed-by-user") {
        setError(loginError.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-emerald-50/60 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-emerald-100 bg-white p-8 text-center shadow-xl sm:p-10">
        <h1 className="text-3xl font-black text-emerald-950">Welcome back</h1>
        <p className="mt-3 text-gray-600">Sign in to view and manage your profile.</p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white transition hover:bg-emerald-900 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Continue with Google"}
        </button>
        {error && <p role="alert" className="mt-4 break-words text-sm text-red-700">{error}</p>}
      </section>
    </main>
  );
};

export default Login;
