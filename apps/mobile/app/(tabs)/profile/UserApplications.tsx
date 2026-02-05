import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@shared/utils/supabaseClient";
import UserApplicationCard from "../../../components/ApplicationCard";

/* ---------- Types ---------- */

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
}

export interface Application {
  id: number;
  status: string;
  created_at: string;
  jobs: Job[] | null; // ✅ ARRAY
}

/* ---------- Component ---------- */

export default function UserApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyApplications();
  }, []);

  async function fetchMyApplications() {
    setLoading(true);

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("applications")
      .select(
        `
        id,
        status,
        created_at,
        jobs:job_id (
          id,
          title,
          company,
          location
        )
      `,
      )
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setApplications(data as Application[]);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
        <Text style={styles.loadingText}>Loading your applications...</Text>
      </View>
    );
  }

  if (!applications.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>You haven’t applied yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {applications.map((app) => (
        <UserApplicationCard key={app.id} application={app} />
      ))}
    </ScrollView>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  loadingText: {
    marginTop: 12,
    color: "#555",
  },
  emptyText: {
    color: "#555",
    fontSize: 16,
  },
});