import { useEffect, useState } from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "@shared/utils/supabaseClient";

export default function EditJob() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchJob() {
      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("id", id)
        .single();

      if (data) {
        setTitle(data.title);
        setCompany(data.company);
        setDescription(data.description);
      }
    }
    fetchJob();
  }, [id]);

  async function handleSave() {
    await supabase
      .from("jobs")
      .update({ title, company, description })
      .eq("id", id);

    router.replace("..");
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput value={title} onChangeText={setTitle} />
      <TextInput value={company} onChangeText={setCompany} />
      <TextInput value={description} onChangeText={setDescription} multiline />

      <Pressable onPress={handleSave} style={{ marginTop: 16 }}>
        <Text style={{ color: "blue", fontWeight: "600" }}>Save Changes</Text>
      </Pressable>
    </View>
  );
}
