// AdminDashboard
"use client";
import { useState } from "react";
import AdminJobs from "./jobs/page";
import AdminApplications from "./applications/page";
import AdminUsers from "./users/page";
import AdminDashboardSummary from "../../components/AdminDashboardSummary";

export default function AdminDashboard() {
  const [tab, setTab] = useState("jobs");

  return (
    <div>
      <AdminDashboardSummary />
      <div>
        {tab === "jobs" && <AdminJobs />}
        {tab === "applications" && <AdminApplications />}
        {tab === "users" && <AdminUsers />}
      </div>
    </div>
  );
}
