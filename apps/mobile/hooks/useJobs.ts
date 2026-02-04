import { fetchJobs, fetchProfile } from "@shared/utils/jobs";
import { useQuery } from "@tanstack/react-query";

export const useJobsMobile = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });

export const useProfileMobile = (userId: string) =>
  useQuery({
    queryKey: ["profile", userId],
    queryFn: () => fetchProfile(userId),
  });
