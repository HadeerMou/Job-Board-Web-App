import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { supabase } from "@shared/utils/supabaseClient";

interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  created_at: string;
}

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  const [coverLetter, setCoverLetter] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchJob() {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setJob(data);
      setLoading(false);
    }

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    setSubmitting(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("You must be logged in to apply");

      const { error } = await supabase.from("applications").insert({
        job_id: id,
        user_id: user.id,
        cover_letter: coverLetter,
      });

      if (error) throw error;

      alert("Application submitted successfully!");
      setCoverLetter("");
    } catch (err: any) {
      alert("Failed to submit: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  if (!job)
    return (
      <Text style={{ textAlign: "center", marginTop: 40 }}>Job not found</Text>
    );

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{job.title}</Text>
      <Text style={{ fontSize: 16, color: "#666", marginBottom: 12 }}>
        {job.company}
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 22, marginBottom: 24 }}>
        {job.description}
      </Text>

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
        Apply for this job
      </Text>
      <TextInput
        placeholder="Write your cover letter..."
        multiline
        value={coverLetter}
        onChangeText={setCoverLetter}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          minHeight: 100,
          textAlignVertical: "top",
        }}
      />
      <TouchableOpacity
        onPress={handleApply}
        disabled={submitting || !coverLetter.trim()}
        style={{
          backgroundColor: "#2563eb",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          opacity: submitting || !coverLetter.trim() ? 0.6 : 1,
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {submitting ? "Submitting..." : "Submit Application"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
