import { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import AdminDashboardSummary from "@/components/AdminDashboardSummary";
import AdminJobs from "./jobs/index";
import AdminApplications from "./applications";
import AdminUsers from "./users";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"jobs" | "applications" | "users">("jobs");
  const { colors, mode } = useThemeMode(); // get dark/light mode

  return (
    <View
      style={[
        styles.container,
        mode === "dark" && { backgroundColor: colors.background },
      ]}
    >
      <AdminDashboardSummary />

      {/* Tabs */}
      <View style={styles.tabs}>
        <TabButton
          title="Jobs"
          active={tab === "jobs"}
          onPress={() => setTab("jobs")}
        />
        <TabButton
          title="Applications"
          active={tab === "applications"}
          onPress={() => setTab("applications")}
        />
        <TabButton
          title="Users"
          active={tab === "users"}
          onPress={() => setTab("users")}
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {tab === "jobs" && <AdminJobs />}
        {tab === "applications" && <AdminApplications />}
        {tab === "users" && <AdminUsers />}
      </View>
    </View>
  );
}

function TabButton({
  title,
  active,
  onPress,
}: {
  title: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, active && styles.activeTab]}
    >
      <Text style={[styles.tabText, active && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabs: {
    flexDirection: "row",
    marginVertical: 16,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: "#111",
  },
  tabText: {
    color: "#555",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
  },
});
