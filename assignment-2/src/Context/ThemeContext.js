import { useState, createContext, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const themeStorage = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(themeStorage);

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    const value = {
        theme,
        toggleTheme,
    };
    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };
