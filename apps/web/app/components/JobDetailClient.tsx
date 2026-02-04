// app/components/JobDetailClient.tsx
"use client";

import { useState } from "react";
import JobApplyForm from "./JobApplyForm";
import { formatDistanceToNow } from "date-fns";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location?: string;
  description: string;
  requirements?: string;
  benefits?: string;
  created_at: string;
}

export default function JobDetailClient({ job }: { job: Job }) {
  const [showApplyForm, setShowApplyForm] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Job header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company}</p>
          {job.location && <p className="text-gray-500">{job.location}</p>}
          <p className="text-gray-400 text-sm">
            Posted {formatDistanceToNow(new Date(job.created_at))} ago
          </p>
        </div>
        {job.companyLogo && (
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-24 h-24 object-contain"
          />
        )}
      </div>

      {/* Description */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </section>

      {/* Requirements */}
      {job.requirements && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.split("\n").map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Benefits */}
      {job.benefits && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Benefits</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.benefits}</p>
        </section>
      )}

      <div className="mt-6">
        <button
          onClick={() => setShowApplyForm(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Apply Now
        </button>
      </div>

      {showApplyForm && (
        <JobApplyForm jobId={job.id} onClose={() => setShowApplyForm(false)} />
      )}
    </div>
  );
}
