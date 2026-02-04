"use client";

import { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import UserApplicationCard from "../../components/ApplicationCard";

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

export default function UserApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  async function fetchMyApplications() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        cover_letter,
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

    if (!error) setApplications(data ?? []);
    setLoading(false);
  }

  if (loading)
    return (
      <p className="text-gray-500 text-center">Loading your applications...</p>
    );

  if (!applications.length)
    return (
      <p className="text-gray-500 text-center">You haven’t applied yet.</p>
    );

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <UserApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
