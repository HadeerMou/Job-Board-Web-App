import { ReactNode, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";
import { useProfile } from "@shared/hooks/useProfile";

type Role = "admin" | "jobseeker";

export default function RequireRole({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const { data, isLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!data || data.role !== role)) {
      router.replace("/login");
    }
  }, [isLoading, data, role]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data || data.role !== role) {
    return null;
  }

  return <>{children}</>;
}
