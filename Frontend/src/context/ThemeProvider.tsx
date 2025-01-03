// providers/ThemeProvider.tsx
import React, { createContext, useContext, useState } from "react";
import { TailwindThemeAdapter } from "../components/adpater/adapter.tsx";

interface ThemeContextType {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<"light" | "dark">("dark");

    const setTheme = (newTheme: "light" | "dark") => {
        setThemeState(newTheme);
        TailwindThemeAdapter.setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
