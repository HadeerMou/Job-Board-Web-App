"use client";

import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
}

interface Props {
  application: {
    id: number;
    status: string;
    created_at: string;
    jobs: Job[] | null; // ✅ ARRAY
  };
}

export default function UserApplicationCard({ application }: Props) {
  const router = useRouter();

  // ✅ safely get the job
  const job = application.jobs?.[0];

  return (
    <div className="flex items-center justify-between p-5 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Job Info */}
      <div>
        <h3 className="font-semibold text-lg">{job?.title ?? "Unknown job"}</h3>
        <p className="text-gray-600">
          {job?.company ?? "Unknown company"} • {job?.location ?? "Remote"}
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Applied {new Date(application.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            application.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : application.status === "accepted"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
          }`}
        >
          {application.status}
        </span>

        {job?.id && (
          <button
            onClick={() => router.push(`/jobs/${job.id}`)}
            className="text-sm text-primary hover:underline"
          >
            View Job
          </button>
        )}
      </div>
    </div>
  );
}
