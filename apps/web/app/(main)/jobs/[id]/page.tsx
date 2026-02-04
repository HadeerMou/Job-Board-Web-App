import JobDetailClient from "@/app/components/JobDetailClient";
import { supabase } from "@shared/utils/supabaseClient";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  created_at: string;
}

// Server Component — NO "use client"
export default async function JobDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>; // params may be a promise
}) {
  // Unwrap the promise if needed
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id) return <p>Invalid job ID</p>;

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Supabase error:", error.message);
    return <p>Failed to load job</p>;
  }

  if (!job) return <p>Job not found</p>;

  return <JobDetailClient job={job as Job} />;
}
