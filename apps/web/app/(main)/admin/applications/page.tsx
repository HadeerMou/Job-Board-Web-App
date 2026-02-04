"use client";

import { useState, useEffect } from "react";
import { supabase } from "@shared/utils/supabaseClient";

interface Application {
  id: number;
  cover_letter: string;
  jobs: {
    title: string;
    company: string;
  } | null;
  profiles: {
    full_name: string;
    role: string;
  } | null;
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchApplications() {
    setLoading(true);
    const { data, error } = await supabase
      .from("applications")
      .select(
        `
      id,
      cover_letter,
      jobs:job_id (
        title,
        company
      ),
      profiles:applications_user_id_fkey (
        full_name,
        role
      )
    `,
      )
      .returns<Application[]>();

    if (error) {
      console.error(error);
      setApplications([]);
    } else {
      setApplications(data ?? []);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-6">Loading applications...</p>
    );

  if (applications.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">No applications found.</p>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Applications</h1>

      <div className="grid gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="rounded-lg p-6 shadow-inner hover:shadow-lg transition-shadow duration-300"
          >
            {/* Job Info */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Job: {app.jobs?.title ?? "No Job Info"}
              </h2>
              <p className="text-gray-600">
                Company: {app.jobs?.company ?? "Unknown"}
              </p>
            </div>

            {/* User Info */}
            <div className="mb-4">
              <p>
                <span className="font-medium text-gray-700">User:</span>{" "}
                {app.profiles?.full_name ?? "Unknown"}
              </p>
              <p>
                <span className="font-medium text-gray-700">Role:</span>{" "}
                {app.profiles?.role ?? "Unknown"}
              </p>
            </div>

            {/* Cover Letter */}
            <div>
              <p className="font-medium text-gray-700 mb-1">Cover Letter:</p>
              <p className="text-gray-700">{app.cover_letter}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
