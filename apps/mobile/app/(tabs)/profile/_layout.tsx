import { Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "@shared/utils/supabaseClient";

export default function ProfileTabsLayout() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4f46e5",
        tabBarInactiveTintColor: "#999",
      }}
    >
      <Tabs.Screen
        name="index" // Profile main page
        options={{ title: "Profile" }}
      />
      <Tabs.Screen
        name="applications" // Profile > Applications page
        options={{ title: "Applications" }}
      />
      <Tabs.Screen
        name="cv" // Profile > CV page
        options={{ title: "CV" }}
      />
    </Tabs>
  );
}
