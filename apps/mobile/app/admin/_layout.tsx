import { Stack, useRouter } from "expo-router";
import RequireRole from "@/components/RequireRole";
import Header from "@/components/Header";
import { View, TouchableOpacity, Text, StyleSheet, Alert } from "react-native";
import { supabase } from "@shared/utils/supabaseClient";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function AdminLayout() {
  const router = useRouter();
  const { colors, mode } = useThemeMode(); // get dark/light mode

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      Alert.alert("Logged out", "You have been logged out successfully.");
      router.replace("/login"); // redirect to login
    } else {
      Alert.alert("Error", error.message);
    }
  };

  const goToSite = () => {
    router.push("/home"); // navigate to site home
  };

  return (
    <RequireRole role="admin">
      <View
        style={[
          styles.container,
          mode === "dark" && { backgroundColor: colors.background },
        ]}
      >
        {/* Header */}
        <Header title="Admin Dashboard" />

        {/* Stack content */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {/* Footer with buttons */}
        <View
          style={[
            styles.footer,
            mode === "dark" && {
              backgroundColor: "#1f2937",
              borderColor: "#374151",
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.button, styles.site]}
            onPress={goToSite}
          >
            <Text
              style={[styles.buttonText, mode === "dark" && { color: "#fff" }]}
            >
              Site
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.logout,
              mode === "dark" && { backgroundColor: "#ef4444" },
            ]}
            onPress={handleLogout}
          >
            <Text
              style={[styles.buttonText, mode === "dark" && { color: "#fff" }]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RequireRole>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb", // your original light mode background
  },
  content: {
    flex: 1,
    width: "100%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#f3f4f6", // light mode footer
    borderTopWidth: 1,
    borderColor: "#e5e7eb", // light mode border
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  site: {
    backgroundColor: "#4f46e5",
  },
  logout: {
    backgroundColor: "#ef4444",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
