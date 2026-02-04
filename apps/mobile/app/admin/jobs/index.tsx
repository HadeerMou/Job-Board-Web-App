import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@shared/utils/supabaseClient";

type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
};

export default function AdminJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchJobs() {
      const { data } = await supabase.from("jobs").select("*");
      setJobs(data || []);
      setLoading(false);
    }
    fetchJobs();
  }, []);

  async function handleDelete(id: string) {
    await supabase.from("jobs").delete().eq("id", id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <FlatList
      data={jobs}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      ListHeaderComponent={
        <Pressable
          onPress={() => router.push("/admin/jobs/new")}
          style={{ marginBottom: 16 }}
        >
          <Text style={{ color: "green", fontWeight: "600" }}>
            + Add New Job
          </Text>
        </Pressable>
      }
      renderItem={({ item }) => (
        <View
          style={{
            padding: 16,
            backgroundColor: "#fff",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "600" }}>{item.title}</Text>
          <Text>{item.company}</Text>

          <View style={{ flexDirection: "row", marginTop: 8 }}>
            <Pressable onPress={() => router.push(`../${item.id}`)}>
              <Text style={{ marginRight: 16, color: "blue" }}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={{ color: "red" }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      )}
    />
  );
}
