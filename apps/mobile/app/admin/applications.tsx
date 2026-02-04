import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { supabase } from "@shared/utils/supabaseClient";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function AdminApplications() {
  const [apps, setApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { colors, mode } = useThemeMode(); // get light/dark mode

  useEffect(() => {
    async function fetchApps() {
      const { data } = await supabase.from("applications").select(`
        id,
        cover_letter,
        jobs:job_id ( title, company ),
        profiles:applications_user_id_fkey ( full_name )
      `);

      setApps(data || []);
      setLoading(false);
    }
    fetchApps();
  }, []);

  if (loading)
    return <ActivityIndicator style={{ marginTop: 40 }} color={colors.tint} />;

  return (
    <FlatList
      data={apps}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        padding: 16,
      }}
      renderItem={({ item }) => (
        <View style={[styles.card]}>
          <Text style={[styles.jobTitle, { color: colors.text }]}>
            {item.jobs?.title} – {item.jobs?.company}
          </Text>
          <Text style={{ color: colors.subtext }}>
            User: {item.profiles?.full_name}
          </Text>
          <Text style={{ color: colors.subtext }}>{item.cover_letter}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 0.1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  jobTitle: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 4,
  },
});
