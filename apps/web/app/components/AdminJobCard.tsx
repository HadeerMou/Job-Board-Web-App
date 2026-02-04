"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@shared/utils/supabaseClient";

interface AdminJobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location?: string;
    description?: string;
    created_at: string;
  };
  onDelete: (id: string) => void;
}

export default function AdminJobCard({ job, onDelete }: AdminJobCardProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/admin/jobs/${job.id}/edit`);
  };

  const handleDuplicate = async () => {
    const { data, error } = await supabase.from("jobs").insert([
      {
        title: job.title + " (Copy)",
        company: job.company,
        description: job.description,
        location: job.location,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) return alert("Error duplicating job: " + error.message);
    alert("Job duplicated!");
  };

  const handleArchive = async () => {
    // Optional: add archive column in jobs table
    alert("Archive functionality not implemented yet");
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
      <div className="flex items-center gap-4">
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 object-contain shrink-0"
          />
        )}
        <div>
          <h2 className="font-bold">{job.title}</h2>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-500 text-sm">{job.location}</p>
        </div>
      </div>

      <div className="relative">
        <button
          className="px-2 py-1 rounded hover:bg-gray-100"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          ⋮
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleDuplicate}
            >
              Duplicate
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleArchive}
            >
              Archive
            </button>
            <button
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
              onClick={() => onDelete(job.id)}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
