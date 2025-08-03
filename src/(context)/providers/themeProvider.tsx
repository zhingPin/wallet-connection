import React, { createContext, useState, ReactNode, FC } from "react";

// 1. Define Theme type
type Theme = {
    mode: "light" | "dark";
    colors: {
        background: string;
        text: string;
    };
};

// 2. Define the context value type
type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

// 3. Create context with default value (null will be handled with a guard or default later)
export const ThemeContext = createContext<ThemeContextType | null>(null);

// 4. Props type for ThemeProvider
type ThemeProviderProps = {
    children: ReactNode;
};

// 5. ThemeProvider component
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>({
        mode: "light",
        colors: {
            background: "#fff",
            text: "#000",
        },
    });

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme.mode === "light"
                ? {
                    mode: "dark",
                    colors: {
                        background: "#333",
                        text: "#fff", // fixed: "#xxx" is not valid
                    },
                }
                : {
                    mode: "light",
                    colors: {
                        background: "#fff",
                        text: "#000",
                    },
                }
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
