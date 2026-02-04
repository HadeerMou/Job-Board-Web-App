import { Tabs } from "expo-router";
import { supabase } from "@shared/utils/supabaseClient";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function TabsLayout() {
  const { colors } = useThemeMode();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.tint} />
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, width: "100%", backgroundColor: colors.background }}
    >
      {/* Shared header */}
      <Header />

      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.icon,

          tabBarStyle: {
            backgroundColor: colors.background,
            height: 60,
            paddingTop: 5,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderTopWidth: 0,
            elevation: 2,
          },

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home-filled" size={20} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user-alt" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
