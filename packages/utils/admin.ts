import { supabase } from "./supabaseClient";

export async function fetchAllApplications() {
  const { data, error } = await supabase.from("applications").select(`
    id,
    cover_letter,
    jobs ( title, company ),
    profiles ( full_name )
  `);

  if (error) throw error;
  return data;
}

export async function createJob(job: any) {
  const { data, error } = await supabase.from("jobs").insert(job);
  if (error) throw error;
  return data;
}

export async function updateJob(id: string, updates: any) {
  const { error } = await supabase.from("jobs").update(updates).eq("id", id);
  if (error) throw error;
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw error;
}
