import { Slot } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@shared/utils/supabaseClient";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function ProfileLayout() {
  const { colors } = useThemeMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(() => {
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

  return <Slot />;
}
