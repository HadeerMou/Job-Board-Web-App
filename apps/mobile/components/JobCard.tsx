import { router } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useThemeMode } from "@/context/ThemeModeContext";

export default function JobCard({ job }: any) {
  const { colors } = useThemeMode();
  const styles = createStyles(colors);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{job.title}</Text>
      <Text style={styles.company}>{job.company}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push(`../../jobs/${job.id}`)}
      >
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 12,
      backgroundColor: colors.background,
      marginBottom: 12,
      borderWidth: 0.1,
      borderColor: colors.icon,
      shadowColor: colors.icon,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    company: {
      fontSize: 14,
      color: colors.icon,
      marginBottom: 8,
    },
    button: {
      backgroundColor: colors.buttonBackground,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    buttonText: {
      color: colors.buttonText,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
