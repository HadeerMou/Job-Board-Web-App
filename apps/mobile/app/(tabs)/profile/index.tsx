import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  ActivityIndicator,
} from "react-native";
import { supabase } from "@shared/utils/supabaseClient";
import UserApplicationCard from "../../../components/ApplicationCard"; // adjust path
import { useRouter } from "expo-router";

type Tab = "applications" | "cv" | "profile";

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
  jobs: Job[] | null; // array
}

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone?: string | null;
  cv_url?: string | null;
}

export default function Profile({ navigation }: any) {
  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [user, setUser] = useState<any>(null); // store supabase user once

  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [applicationsLoaded, setApplicationsLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const tabs: { key: Tab; label: string }[] = [
    { key: "applications", label: "Applications" },
    { key: "cv", label: "CV" },
    { key: "profile", label: "Profile" },
  ];

  const router = useRouter(); // hook inside component

  if (!user) router.replace("/login");

  // fetch data on tab switch, only once per tab
  useEffect(() => {
    if (!user) return;

    if (activeTab === "applications" && !applicationsLoaded) {
      fetchMyApplications(user.id);
      setApplicationsLoaded(true);
    }

    if ((activeTab === "profile" || activeTab === "cv") && !profileLoaded) {
      fetchUserProfile(user.id);
      setProfileLoaded(true);
    }
  }, [activeTab, user]);

  async function fetchMyApplications(userId: string) {
    setLoadingApplications(true);
    const { data } = await supabase
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
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    setApplications((data ?? []) as Application[]);
    setLoadingApplications(false);
  }

  async function fetchUserProfile(userId: string) {
    setLoadingProfile(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, cv_url")
      .eq("id", userId)
      .single();

    setProfile(data ?? null);
    setLoadingProfile(false);
  }

  return (
    <ScrollView style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tabButton,
              activeTab === tab.key && styles.activeTabButton,
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.key && styles.activeTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === "applications" && (
        <View style={styles.content}>
          {loadingApplications ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#4f46e5" />
            </View>
          ) : applications.length === 0 ? (
            <Text style={styles.emptyText}>You haven’t applied yet.</Text>
          ) : (
            applications.map((app) => (
              <UserApplicationCard key={app.id} application={app} />
            ))
          )}
        </View>
      )}

      {activeTab === "cv" && (
        <View style={styles.content}>
          {loadingProfile ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#4f46e5" />
            </View>
          ) : profile?.cv_url ? (
            <Text
              style={styles.linkText}
              onPress={() => Linking.openURL(profile.cv_url!)}
            >
              View your CV
            </Text>
          ) : (
            <Text style={styles.emptyText}>You haven't uploaded a CV yet.</Text>
          )}
        </View>
      )}

      {activeTab === "profile" && (
        <View style={styles.content}>
          {loadingProfile ? (
            <View style={styles.center}>
              <ActivityIndicator size="large" color="#4f46e5" />
            </View>
          ) : profile ? (
            <View>
              <Text style={styles.profileText}>
                <Text style={styles.bold}>Name: </Text>
                {profile.full_name || "Not set"}
              </Text>
              <Text style={styles.profileText}>
                <Text style={styles.bold}>Email: </Text>
                {profile.email || "Not set"}
              </Text>
              {profile.phone && (
                <Text style={styles.profileText}>
                  <Text style={styles.bold}>Phone: </Text>
                  {profile.phone}
                </Text>
              )}
            </View>
          ) : (
            <Text style={styles.emptyText}>No profile information found.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  tabs: {
    flexDirection: "row",
    marginBottom: 16,
    justifyContent: "space-around",
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: { borderBottomColor: "#4f46e5" },
  tabText: { color: "#888", fontWeight: "500" },
  activeTabText: { color: "#4f46e5", fontWeight: "bold" },
  content: { marginBottom: 24 },
  emptyText: { textAlign: "center", color: "#888", marginTop: 20 },
  linkText: {
    color: "#4f46e5",
    textAlign: "center",
    textDecorationLine: "underline",
    marginTop: 20,
  },
  profileText: { fontSize: 16, marginBottom: 8 },
  bold: { fontWeight: "bold" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
