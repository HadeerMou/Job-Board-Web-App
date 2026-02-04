import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@shared/utils/jobs";
import { supabase } from "@shared/utils/supabaseClient";

export const useProfile = () => {
  const user = supabase.auth.getUser(); // or wrap in fetchProfile if you want
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;
      return fetchProfile(user.id);
    },
  });
};
