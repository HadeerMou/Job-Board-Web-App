import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@shared/utils/jobs";

export const useJobs = () =>
  useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs,
  });
