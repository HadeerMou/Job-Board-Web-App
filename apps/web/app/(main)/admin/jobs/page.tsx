"use client";

import { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import { useRouter } from "next/navigation";
import AdminJobCard from "@/app/components/AdminJobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  created_at: string;
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase.from<"jobs", Job>("jobs").select("*");
      setJobs(data || []);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;
  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this job?")) return;

    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      alert("Error deleting job: " + error.message);
    } else {
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
    }
  }

  const router = useRouter();

  function handleEdit(job: Job) {
    router.push(`/admin/jobs/${job.id}/edit`);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <button
        className="mb-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => router.push("/admin/jobs/new")}
      >
        Add New Job
      </button>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-2">
          {jobs.map((job) => (
            <AdminJobCard key={job.id} job={job} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}
