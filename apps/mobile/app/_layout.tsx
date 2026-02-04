import { Slot } from "expo-router";
import { SafeAreaView } from "react-native";
import Providers from "./providers";
import { useThemeMode } from "../context/ThemeModeContext";

function LayoutContent() {
  const { colors } = useThemeMode();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Slot />
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <LayoutContent />
    </Providers>
  );
}
