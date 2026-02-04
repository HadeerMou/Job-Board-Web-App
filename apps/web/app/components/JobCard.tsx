// app/components/JobCard.tsx
import Link from "next/link";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location?: string;
    description?: string;
    created_at: string;
  };
}

export default function JobCard({ job }: JobCardProps) {
  const navigateToJob = () => {
    window.location.href = `/jobs/${job.id}`;
  };

  return (
    <div
      onClick={navigateToJob}
      className="flex items-center justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
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

      <div className="flex flex-col items-end gap-2">
        <time className="text-gray-400 text-sm">
          {timeSince(new Date(job.created_at))}
        </time>

        <Link
          href={`/jobs/${job.id}`}
          className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm font-medium"
          onClick={(e) => e.stopPropagation()} // prevent card click
        >
          Apply
        </Link>
      </div>
    </div>
  );
}

// Helper function to show relative time like "2 days ago"
function timeSince(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days ago";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours ago";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes ago";
  return "Just now";
}
