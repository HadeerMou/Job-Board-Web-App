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
import { useRouter } from "expo-router";
import UserApplications from "./UserApplications";
import { useThemeMode } from "@/context/ThemeModeContext";

type Tab = "applications" | "cv" | "profile";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  cv_url: string | null;
}

export default function Profile() {
  const router = useRouter();
  const { colors } = useThemeMode();
  const styles = createStyles(colors);
  const [activeTab, setActiveTab] = useState<Tab>("applications");
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Get logged-in user
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setLoadingUser(false);
    });
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!loadingUser && !user) {
      router.replace("/login");
    }
  }, [loadingUser, user]);

  // Fetch profile ONLY when needed
  useEffect(() => {
    if (!user) return;
    if ((activeTab === "profile" || activeTab === "cv") && !profile) {
      fetchUserProfile(user.id);
    }
  }, [activeTab, user]);

  async function fetchUserProfile(userId: string) {
    setLoadingProfile(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, phone, cv_url")
      .eq("id", userId)
      .single();

    if (!error) setProfile(data);
    setLoadingProfile(false);
  }
  function openCV(url: string | null) {
    if (!url) return;
    Linking.openURL(url);
  }

  if (loadingUser) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  if (!user) return null;

  const tabs: { key: Tab; label: string }[] = [
    { key: "applications", label: "Applications" },
    { key: "cv", label: "CV" },
    { key: "profile", label: "Profile" },
  ];

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

      {/* Applications */}
      {activeTab === "applications" && <UserApplications />}

      {/* CV */}
      {activeTab === "cv" && (
        <View style={styles.content}>
          {loadingProfile ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : profile?.cv_url ? (
            <Text
              style={styles.linkText}
              onPress={() => openCV(profile?.cv_url)}
            >
              View your CV
            </Text>
          ) : (
            <Text style={styles.emptyText}>You haven't uploaded a CV yet.</Text>
          )}
        </View>
      )}

      {/* Profile */}
      {activeTab === "profile" && (
        <View style={styles.content}>
          {loadingProfile ? (
            <ActivityIndicator size="large" color="#4f46e5" />
          ) : profile ? (
            <>
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
            </>
          ) : (
            <Text style={styles.emptyText}>No profile data found.</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    tabs: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginBottom: 16,
    },
    tabButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    activeTabButton: {
      borderBottomColor: colors.tint,
    },
    tabText: {
      color: colors.tint,
    },
    activeTabText: {
      color: colors.tint,
      fontWeight: "bold",
    },
    content: {
      marginTop: 16,
    },
    emptyText: {
      textAlign: "center",
      color: colors.textMuted,
      marginTop: 20,
    },
    linkText: {
      color: colors.tint,
      textAlign: "center",
      textDecorationLine: "underline",
      marginTop: 20,
    },
    profileText: {
      fontSize: 16,
      marginBottom: 8,
      color: colors.text,
    },
    bold: {
      fontWeight: "bold",
      color: colors.text,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
