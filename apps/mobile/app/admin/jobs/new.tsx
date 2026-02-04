import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@shared/utils/supabaseClient";

export default function NewJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit() {
    await supabase.from("jobs").insert({ title, company, description });
    router.replace("..");
  }

  return (
    <View style={{ padding: 16 }}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} />
      <TextInput
        placeholder="Company"
        value={company}
        onChangeText={setCompany}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Pressable onPress={handleSubmit} style={{ marginTop: 16 }}>
        <Text style={{ color: "green", fontWeight: "600" }}>Create Job</Text>
      </Pressable>
    </View>
  );
}
