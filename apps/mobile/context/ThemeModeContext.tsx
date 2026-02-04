import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors, Fonts } from "../constants/theme"; // <-- your mobile constants

type ThemeMode = "light" | "dark";

interface ThemeModeContextType {
  colors: typeof Colors.light;
  fonts: typeof Fonts;
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType | null>(null);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const systemTheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemTheme === "dark" ? "dark" : "light",
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const colors = Colors[mode];
  const fonts = Fonts;

  return (
    <ThemeModeContext.Provider value={{ colors, fonts, mode, toggleTheme }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within ThemeModeProvider");
  }
  return context;
}
