import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { supabase } from "@shared/utils/supabaseClient";

function SummaryCard({ title, count }: { title: string; count: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

export default function AdminDashboardSummary() {
  const [userCount, setUserCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [applicationCount, setApplicationCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      const { count: users } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true });

      const { count: admins } = await supabase
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("role", "admin");

      const { count: jobs } = await supabase
        .from("jobs")
        .select("id", { count: "exact", head: true });

      const { count: applications } = await supabase
        .from("applications")
        .select("id", { count: "exact", head: true });

      setUserCount(users || 0);
      setAdminCount(admins || 0);
      setJobCount(jobs || 0);
      setApplicationCount(applications || 0);
    }

    fetchCounts();
  }, []);

  return (
    <View style={styles.grid}>
      <SummaryCard title="Users" count={userCount} />
      <SummaryCard title="Admins" count={adminCount} />
      <SummaryCard title="Jobs" count={jobCount} />
      <SummaryCard title="Applications" count={applicationCount} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    elevation: 2,
  },
  title: {
    fontSize: 12,
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 6,
  },
  count: {
    fontSize: 26,
    fontWeight: "bold",
  },
});
