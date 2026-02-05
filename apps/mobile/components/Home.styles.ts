import { StyleSheet } from "react-native";

export const createStyles = (colors: any) =>
  StyleSheet.create({
    hero: {
      marginBottom: 16,
    },
    heroTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    heroSubtitle: {
      fontSize: 14,
      color: colors.icon,
      marginBottom: 12,
    },
    categories: {
      flexDirection: "row",
      gap: 8,
    },
    categoryButton: {
      backgroundColor: colors.card ?? colors.background,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    categoryText: {
      color: colors.text,
    },
    filters: {
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.icon,
      padding: 10,
      borderRadius: 8,
      marginBottom: 8,
      color: colors.text,
    },
    filterButton: {
      backgroundColor: colors.buttonBackground,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
    },
    filterButtonText: {
      color: "#fff",
      fontWeight: "bold",
    },
    jobList: {},
    loading: {
      textAlign: "center",
      color: colors.text,
      marginTop: 20,
    },
    error: {
      textAlign: "center",
      color: "red",
      marginTop: 20,
    },
  });
