"use client";

import { supabase } from "@shared/utils/supabaseClient";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation"; // router for navigation
import { FaApple, FaGoogle, FaTwitter } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const login = async () => {
    setLoading(true);
    setError(null);

    try {
      // Sign in user
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) throw new Error(signInError.message);

      const userId = signInData.user?.id;
      if (!userId) throw new Error("No user found");

      // Try to fetch role from profile
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .select("role")
        .eq("id", userId)
        .single();

      let role: string;

      if (profileError || !profileData) {
        console.warn("Profile fetch failed:", profileError?.message);
        // Fallback role if profile cannot be fetched
        role = "user";
      } else {
        role = profileData.role;
      }

      // Redirect based on role
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Logo + Header */}
      <div className="flex justify-center mb-6">
        <div className="w-15 h-15 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl font-bold">
          WTH
        </div>
      </div>

      <h2 className="text-center text-2xl font-semibold mb-1">Welcome Back</h2>
      <p className="text-center text-gray-500 mb-8 text-sm">
        Don’t have an account yet?{" "}
        <Link
          href="/register"
          className="text-indigo-600 font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>

      {/* Inputs */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        className="space-y-6"
      >
        <div className="relative">
          <input
            type="email"
            required
            className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="relative">
          <input
            type="password"
            required
            className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-4 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center select-none">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* OR separator */}
      <div className="flex items-center my-6">
        <hr className="grow border-gray-300" />
        <span className="mx-3 text-gray-400 font-semibold text-sm">OR</span>
        <hr className="grow border-gray-300" />
      </div>

      {/* Social buttons */}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          aria-label="Login with Apple"
          className="flex items-center justify-center flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FaApple className="text-xl" />
        </button>

        <button
          type="button"
          aria-label="Login with Google"
          className="flex items-center justify-center flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-xl" />
        </button>

        <button
          type="button"
          aria-label="Login with Twitter"
          className="flex items-center justify-center flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FaTwitter className="text-xl" />
        </button>
      </div>
    </>
  );
}
