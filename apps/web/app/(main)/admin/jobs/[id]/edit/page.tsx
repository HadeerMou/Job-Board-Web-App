"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@shared/utils/supabaseClient";

type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  created_at: string;
};

export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    async function fetchJob() {
      const { data, error } = (await supabase
        .from("jobs")
        .select("*")
        .eq("id", jobId)
        .single()) as { data: Job | null; error: any };

      if (error) {
        alert("Error loading job: " + error.message);
        router.push("/admin/jobs");
      } else if (data) {
        setJob(data);
        setTitle(data.title);
        setCompany(data.company);
        setDescription(data.description);
      }
      setLoading(false);
    }

    fetchJob();
  }, [jobId, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title || !company || !description) {
      alert("Please fill all fields");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("jobs")
      .update({ title, company, description })
      .eq("id", jobId);

    setSaving(false);

    if (error) {
      alert("Error updating job: " + error.message);
    } else {
      alert("Job updated successfully!");
      router.push("/admin/jobs");
    }
  }

  if (loading) return <p>Loading job data...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Edit Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Company"
          className="w-full border rounded p-2"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <textarea
          placeholder="Job Description"
          className="w-full border rounded p-2 h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {saving ? "Saving..." : "Update Job"}
        </button>
      </form>
    </div>
  );
}
