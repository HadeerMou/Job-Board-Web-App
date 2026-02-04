import { supabase } from "./supabaseClient";

export async function applyToJob(jobId: string, coverLetter: string) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not authenticated");
  }

  const { error } = await supabase.from("applications").insert({
    job_id: jobId,
    user_id: user.id,
    cover_letter: coverLetter,
  });

  if (error) throw error;
}
