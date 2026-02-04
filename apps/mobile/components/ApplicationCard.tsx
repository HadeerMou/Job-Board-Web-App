import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
}

interface Application {
  id: number;
  status: string;
  created_at: string;
  jobs: Job[] | null;
}

interface Props {
  application: Application;
}

export default function UserApplicationCard({ application }: Props) {
  const router = useRouter();
  const job = application.jobs?.[0];

  // Status color mapping
  const statusColors: Record<string, { bg: string; text: string }> = {
    pending: { bg: "#FEF3C7", text: "#B45309" },
    accepted: { bg: "#DCFCE7", text: "#166534" },
    rejected: { bg: "#FEE2E2", text: "#B91C1C" },
  };

  const statusColor = statusColors[application.status] || {
    bg: "#E5E7EB",
    text: "#374151",
  };

  return (
    <View style={styles.card}>
      {/* Job Info */}
      <View>
        <Text style={styles.title}>{job?.title ?? "Unknown job"}</Text>
        <Text style={styles.company}>
          {job?.company ?? "Unknown company"} • {job?.location ?? "Remote"}
        </Text>
        <Text style={styles.date}>
          Applied {new Date(application.created_at).toLocaleDateString()}
        </Text>
      </View>

      {/* Status and View Button */}
      <View style={styles.actions}>
        <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.statusText, { color: statusColor.text }]}>
            {application.status}
          </Text>
        </View>

        {/* {job?.id && (
          <TouchableOpacity onPress={() => router.push(`/jobs/${job.id}`)}>
            <Text style={styles.viewJob}>View Job</Text>
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 16, fontWeight: "bold" },
  company: { fontSize: 14, color: "#6B7280", marginTop: 2 },
  date: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  actions: { alignItems: "flex-end", justifyContent: "space-between" },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  statusText: { fontSize: 12, fontWeight: "600" },
  viewJob: { color: "#4F46E5", fontSize: 14 },
});
