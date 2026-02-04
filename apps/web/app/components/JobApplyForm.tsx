"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@shared/utils/supabaseClient";

interface JobApplyFormProps {
  jobId: string;
  onClose: () => void;
}

export default function JobApplyForm({ jobId, onClose }: JobApplyFormProps) {
  const [coverLetter, setCoverLetter] = useState("");

  const applyMutation = useMutation({
    mutationFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("You must be logged in");

      const { error } = await supabase.from("applications").insert({
        job_id: jobId,
        user_id: user.id,
        cover_letter: coverLetter,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      alert("Application submitted successfully!");
      onClose();
    },
    onError: (err: any) => {
      alert("Failed to submit: " + err.message);
    },
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Apply for this job</h2>
        <textarea
          className="w-full border rounded p-3 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your cover letter..."
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
        />
        <button
          onClick={() => applyMutation.mutate()}
          disabled={applyMutation.isPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {applyMutation.isPending ? "Submitting..." : "Submit Application"}
        </button>
      </div>
    </div>
  );
}
