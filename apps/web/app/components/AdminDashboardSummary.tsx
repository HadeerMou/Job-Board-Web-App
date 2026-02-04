"use client";

import { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";

function SummaryCard({ title, count }: { title: string; count: number }) {
  return (
    <div className=" rounded-lg p-6 shadow flex flex-col items-center">
      <h3 className="uppercase text-sm font-semibold text-gray-500 mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold">{count}</p>
    </div>
  );
}

export default function AdminDashboardSummary() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });
      setUserCount(usersCount || 0);

      const { count: adminsCount } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");
      setAdminCount(adminsCount || 0);

      const { count: jobsCount } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true });
      setJobCount(jobsCount || 0);

      const { count: applicationsCount } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true });
      setApplicationCount(applicationsCount || 0);
    }

    fetchCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <SummaryCard title="Users" count={userCount} />
      <SummaryCard title="Admins" count={adminCount} />
      <SummaryCard title="Job Posts" count={jobCount} />
      <SummaryCard title="Applications" count={applicationCount} />
    </div>
  );
}
