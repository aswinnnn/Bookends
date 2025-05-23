import React, { createContext, useEffect, useState, useContext } from "react";

// Define the structure of the Theme object
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  wallpaperImage: string;
  isWallpaperEnabled: boolean;
  fontTitle: string;
  fontBody: string;
  textColor: string;
}

// Define the context and its types
interface ThemeContextType {
  themeMode: "light" | "dark";
  lightTheme: Theme;
  darkTheme: Theme;
  toggleThemeMode: () => void;
  updateTheme: (lightTheme?: Partial<Theme>, darkTheme?: Partial<Theme>) => void;
  loadTheme: () => void;
  applyTemporaryTheme: (theme: Theme) => void; // New method to apply a temporary theme
}

const defaultLightTheme: Theme = {
  primary: "#ffffff",
  secondary: "#f0f0f0",
  accent: "#0078d4",
  wallpaperImage: "",
  isWallpaperEnabled: false,
  fontTitle: "Playfair Display",
  fontBody: "Lexend Deca",
  textColor: "#000000",
};

const defaultDarkTheme: Theme = {
  primary: "#241f31",
  secondary: "#3d3846",
  accent: "#813d9c",
  wallpaperImage: "",
  isWallpaperEnabled: false,
  fontTitle: "Playfair Display",
  fontBody: "Lexend Deca",
  textColor: "#ffffff",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper function to update CSS variables for both light and dark themes
const updateCSSVariables = (lightTheme: Theme, darkTheme: Theme, themeMode: "light" | "dark") => {
  const root = document.documentElement;

  // Update light theme variables
  root.style.setProperty("--color-bookends-primary", lightTheme.primary);
  root.style.setProperty("--color-bookends-secondary", lightTheme.secondary);
  root.style.setProperty("--color-bookends-accent", lightTheme.accent);
  root.style.setProperty("--font-display", lightTheme.fontTitle);
  root.style.setProperty("--font-body", lightTheme.fontBody);
  root.style.setProperty("--color-bookends-text", lightTheme.textColor);

  // Update dark theme variables
  root.style.setProperty("--color-bookends-dark-primary", darkTheme.primary);
  root.style.setProperty("--color-bookends-dark-secondary", darkTheme.secondary);
  root.style.setProperty("--color-bookends-dark-accent", darkTheme.accent);
  root.style.setProperty("--font-dark-display", darkTheme.fontTitle);
  root.style.setProperty("--font-dark-body", darkTheme.fontBody);
  root.style.setProperty("--color-bookends-dark-text", darkTheme.textColor);

  // Handle wallpaper
  if (themeMode === "light" && lightTheme.isWallpaperEnabled) {
    root.style.setProperty("--wallpaper-image", `url(${lightTheme.wallpaperImage})`);
  } else if (themeMode === "dark" && darkTheme.isWallpaperEnabled) {
    root.style.setProperty("--wallpaper-image", `url(${darkTheme.wallpaperImage})`);
  } else {
    root.style.removeProperty("--wallpaper-image");
  }
};

// ThemeContext Provider
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">(() => {
    const storedThemeMode = localStorage.getItem("themeMode");
    return storedThemeMode === "dark" ? "dark" : "light";
  });

  const [lightTheme, setLightTheme] = useState<Theme>(() => {
    const storedLightTheme = localStorage.getItem("lightTheme");
    return storedLightTheme ? JSON.parse(storedLightTheme) : defaultLightTheme;
  });

  const [darkTheme, setDarkTheme] = useState<Theme>(() => {
    const storedDarkTheme = localStorage.getItem("darkTheme");
    return storedDarkTheme ? JSON.parse(storedDarkTheme) : defaultDarkTheme;
  });

  const [temporaryTheme, setTemporaryTheme] = useState<Theme | null>(null); // Temporary theme state

  // Load the theme and apply CSS variables
  const loadTheme = () => {
    setTemporaryTheme(null); // Clear temporary theme
    updateCSSVariables(lightTheme, darkTheme, themeMode);
    document.documentElement.classList.toggle("dark", themeMode === "dark");
  };

  // Apply a temporary theme
  const applyTemporaryTheme = (theme: Theme) => {
    setTemporaryTheme(theme);
    updateCSSVariables(theme, theme, themeMode); // Apply temporary theme to both modes
  };

  // Update local storage and the `document` class when the theme mode changes
  useEffect(() => {
    if (!temporaryTheme) {
      localStorage.setItem("themeMode", themeMode);
      document.documentElement.classList.toggle("dark", themeMode === "dark");
      updateCSSVariables(lightTheme, darkTheme, themeMode);
    }
  }, [themeMode, lightTheme, darkTheme, temporaryTheme]);

  // Update local storage and CSS variables when the themes change
  useEffect(() => {
    if (!temporaryTheme) {
      localStorage.setItem("lightTheme", JSON.stringify(lightTheme));
      localStorage.setItem("darkTheme", JSON.stringify(darkTheme));
      updateCSSVariables(lightTheme, darkTheme, themeMode);
    }
  }, [lightTheme, darkTheme, themeMode, temporaryTheme]);

  // Toggle between light and dark theme modes
  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  // Update the themes
  const updateTheme = (newLightTheme?: Partial<Theme>, newDarkTheme?: Partial<Theme>) => {
    if (newLightTheme) {
      setLightTheme((prevTheme) => ({ ...prevTheme, ...newLightTheme }));
    }
    if (newDarkTheme) {
      setDarkTheme((prevTheme) => ({ ...prevTheme, ...newDarkTheme }));
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        lightTheme,
        darkTheme,
        toggleThemeMode,
        updateTheme,
        loadTheme,
        applyTemporaryTheme, // Expose the method to apply a temporary theme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};