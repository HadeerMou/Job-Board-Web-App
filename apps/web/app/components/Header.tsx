"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";
import { FaMoon, FaSun } from "react-icons/fa";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => setUser(session?.user ?? null),
    );
    return () => listener?.subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  }

  return (
    <header className="shadow-sm sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between py-4 gap-4 md:gap-0">
          {/* Logo */}
          <Link href={isAdmin ? "/admin" : "/"} className="text-xl font-bold ">
            JobBoard
          </Link>

          {/* Nav / Buttons */}
          <div className="flex flex-wrap items-center gap-2 md:gap-6">
            {isAdmin ? (
              <nav className="flex flex-wrap items-center gap-2 md:gap-6 text-sm font-medium">
                <Link
                  href="/admin/jobs"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Jobs
                </Link>
                <Link
                  href="/admin/post-job"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Post Job
                </Link>
                <Link
                  href="/admin/users"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Users
                </Link>
                <Link
                  href="/admin/applications"
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Applications
                </Link>
                {mounted && (
                  <button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                    className="p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {theme === "dark" ? (
                      <FaSun className="text-yellow-400" />
                    ) : (
                      <FaMoon />
                    )}
                  </button>
                )}
              </nav>
            ) : (
              <div className="flex flex-wrap items-center gap-2 md:gap-4">
                <Link
                  href="/jobs"
                  className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Jobs
                </Link>

                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="font-medium hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      Profile
                    </Link>
                    {mounted && (
                      <button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="p-2 rounded-md border hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                      >
                        {theme === "dark" ? (
                          <FaSun className="text-yellow-400" />
                        ) : (
                          <FaMoon />
                        )}
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
