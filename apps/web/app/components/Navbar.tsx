/* "use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@shared/utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null as any | null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check current session on mount
    const fetchUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);

        // fetch role from profiles
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();

        setRole(profile?.role ?? null);
      } else {
        setUser(null);
        setRole(null);
      }
    };

    fetchUser();

    // Also listen to auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md max-w-7xl mx-auto">
      <Link href="/" className="text-xl font-bold text-orange-500">
        JobBoard
      </Link>

      <div className="flex items-center space-x-4">
        {!user && (
          <>
            <Link
              href="/login"
              className="px-4 py-2 border border-orange-500 rounded text-orange-500 hover:bg-orange-50 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
            >
              Register
            </Link>
          </>
        )}

        {user && role !== "admin" && (
          <>
            <Link
              href="/profile"
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}

        {user && role === "admin" && (
          <>
            <Link
              href="/admin"
              className="px-4 py-2 border border-purple-500 rounded text-purple-500 hover:bg-purple-50 transition"
            >
              Admin Page
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
 */
