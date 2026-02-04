import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { supabase } from "@shared/utils/supabaseClient";

type User = {
  id: string;
  full_name: string;
  role: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase.from("profiles").select("*");
      setUsers(data || []);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} />;

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <View
          style={{
            padding: 16,
            backgroundColor: "#fff",
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontWeight: "600" }}>{item.full_name}</Text>
          <Text style={{ color: "#666" }}>{item.role}</Text>
        </View>
      )}
    />
  );
}
