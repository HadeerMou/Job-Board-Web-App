"use client";

import { useState, useEffect } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import { useJobs } from "@shared/hooks/useJobs";
import JobCard from "@/app/components/JobCard";

export default function Home() {
  const { data, isLoading, error } = useJobs();

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Error loading jobs</p>;

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold leading-tight mb-4">
          Find top jobs for web designers and developers.
        </h1>
        <p className="text-gray-600 text-lg">
          Hiring? Connect with over 11,000 talented web designers and developers
          available for full-time, part-time, or freelance opportunities.
        </p>

        {/* Category Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 transition">
            Web Design
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 transition">
            Web Development
          </button>
          <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-300 transition">
            Web Entry
          </button>
        </div>
      </section>
      {/* Filters/Search */}
      <section className="max-w-4xl mx-auto rounded-xl shadow-lg p-6 mb-12">
        <form className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <input
            type="text"
            placeholder="Search by title or company"
            className="col-span-2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <input
            type="text"
            placeholder="Search by city or country"
            className="col-span-2 border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="submit"
            className="bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-800 transition col-span-1"
          >
            Filter jobs
          </button>
        </form>

        {/* Dropdown Filters */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Category</option>
            <option>Web Design</option>
            <option>Development</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Related tags</option>
            <option>UX</option>
            <option>React</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Job type</option>
            <option>Full-time</option>
            <option>Part-time</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Location</option>
            <option>Remote</option>
            <option>On-site</option>
          </select>
          <select className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600">
            <option>Remote</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </section>

      {/* Job Cards */}
      <div className="max-w-5xl mx-auto p-6 space-y-4">
        {data?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

// Component for job seeker to apply
function ApplyButton({ jobId }: { jobId: number }) {
  async function apply() {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return alert("You must be logged in to apply.");

    const { data, error } = await supabase.from("applications").insert({
      job_id: jobId,
      user_id: user.id,
      cover_letter: "I am very interested in this position",
    });

    if (error) console.error(error);
    else alert("Applied successfully!");
  }

  return <button onClick={apply}>Apply</button>;
}
