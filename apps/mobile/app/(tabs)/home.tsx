import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useJobsMobile } from "../../hooks/useJobs";
import JobCard from "../../components/JobCard";
import { useThemeMode } from "@/context/ThemeModeContext";
import { createStyles } from "@/components/Home.styles";

export default function Home() {
  const { colors } = useThemeMode();
  const styles = createStyles(colors);

  const { data, isLoading, error } = useJobsMobile();
  const [titleSearch, setTitleSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20 }}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>
          Find top jobs for web designers and developers.
        </Text>
        <Text style={styles.heroSubtitle}>
          Connect with talented designers and developers available for
          full-time, part-time, or freelance work.
        </Text>

        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Web Design</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Web Development</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Web Entry</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TextInput
          placeholder="Search by title or company"
          placeholderTextColor={colors.icon}
          value={titleSearch}
          onChangeText={setTitleSearch}
          style={styles.input}
        />

        <TextInput
          placeholder="Search by city or country"
          placeholderTextColor={colors.icon}
          value={locationSearch}
          onChangeText={setLocationSearch}
          style={styles.input}
        />

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filter jobs</Text>
        </TouchableOpacity>
      </View>

      {/* Jobs */}
      <View style={styles.jobList}>
        {isLoading && <Text style={styles.loading}>Loading jobs...</Text>}
        {error && <Text style={styles.error}>Error loading jobs</Text>}
        {data?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </View>
    </ScrollView>
  );
}
