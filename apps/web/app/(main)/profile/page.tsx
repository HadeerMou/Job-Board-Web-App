"use client";

import { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import UserApplicationCard from "../../components/ApplicationCard";

type Tab = "applications" | "cv" | "profile";

interface Application {
  id: number;
  status: string;
  created_at: string;
  jobs:
    | {
        id: string;
        title: string;
        company: string;
        location?: string;
      }[]
    | null;
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone?: string | null;
  cv_url?: string | null;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("applications");

  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === "applications") fetchMyApplications();
    if (activeTab === "profile" || activeTab === "cv") fetchUserProfile();
  }, [activeTab]);

  // Fetch user applications
  async function fetchMyApplications() {
    setLoadingApplications(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        created_at,
        jobs:job_id (
          id,
          title,
          company,
          location
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setApplications(data ?? []);
    setLoadingApplications(false);
  }

  // Fetch user profile
  async function fetchUserProfile() {
    setLoadingProfile(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, cv_url")
      .eq("id", user.id)
      .single();

    setProfile(data ?? null);
    setLoadingProfile(false);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Menu */}
      <div className="flex gap-8 border-b mb-6">
        {(["applications", "cv", "profile"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize ${
              activeTab === tab
                ? "border-b-2 border-primary font-medium"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "applications" && (
        <>
          {loadingApplications && (
            <p className="text-gray-400 text-center">
              Loading your applications…
            </p>
          )}

          {!loadingApplications && applications.length === 0 && (
            <p className="text-gray-400 text-center">
              You haven’t applied yet.
            </p>
          )}

          <div className="space-y-4">
            {applications.map((app) => (
              <UserApplicationCard key={app.id} application={app} />
            ))}
          </div>
        </>
      )}

      {activeTab === "cv" && (
        <div className="text-gray-600 text-center">
          {loadingProfile ? (
            <p>Loading CV…</p>
          ) : profile?.cv_url ? (
            <a
              href={profile.cv_url}
              target="_blank"
              className="text-blue-500 underline"
            >
              View your CV
            </a>
          ) : (
            <p>You haven't uploaded a CV yet.</p>
          )}
        </div>
      )}

      {activeTab === "profile" && (
        <div className="text-gray-600 space-y-2">
          {loadingProfile ? (
            <p>Loading profile…</p>
          ) : profile ? (
            <>
              <p>
                <strong>Name:</strong> {profile.full_name || "Not set"}
              </p>
              <p>
                <strong>Email:</strong> {profile.email || "Not set"}
              </p>
              {profile.phone && (
                <p>
                  <strong>Phone:</strong> {profile.phone}
                </p>
              )}
            </>
          ) : (
            <p>No profile information found.</p>
          )}
        </div>
      )}
    </div>
  );
}
