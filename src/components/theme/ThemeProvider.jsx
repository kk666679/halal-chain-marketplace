"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeContext = createContext({
  theme: "system",
  setTheme: () => null,
  toggleTheme: () => null,
  isDark: false,
});

export function ThemeProvider({ 
  children, 
  defaultTheme = "system", 
  storageKey = "theme", 
  enableSystem = true,
  ...props 
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      {...props}
    >
      <ThemeProviderInternal>{children}</ThemeProviderInternal>
    </NextThemesProvider>
  );
}

function ThemeProviderInternal({ children }) {
  const { theme, setTheme, resolvedTheme } = useContext(NextThemesProvider.Context);
  const [mounted, setMounted] = useState(false);
  
  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDark = resolvedTheme === "dark";
  
  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };
  
  // Provide the theme context to children
  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark,
  };
  
  // Prevent flash of incorrect theme
  if (!mounted) {
    return <>{children}</>;
  }
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export function ThemeToggle({ className, ...props }) {
  const { toggleTheme, isDark } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${className}`}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      {...props}
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  );
}