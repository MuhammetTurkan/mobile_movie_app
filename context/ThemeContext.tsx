import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { darkColors, lightColors } from "./theme";
import { setCustomNativeWindColors } from "./themeUtils";

type ThemeType = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  colors: {
    tabBarBackground: string;
    tabIcon: string;
  };
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const colors = theme === "dark" ? darkColors : lightColors;

  useEffect(() => {
    setCustomNativeWindColors(colors);
  }, [colors]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
