import React, { createContext, useContext, useState, useEffect } from 'react';
import { darkTheme, lightTheme } from '../assets/theme';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('dark');
        return savedMode ? JSON.parse(savedMode) : false;
    });

    const [theme, setTheme] = useState(() => {
        return isDarkMode ? darkTheme : lightTheme;
    });

    useEffect(() => {
        localStorage.setItem('dark', JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleTheme = () => {
        setTheme(theme === lightTheme ? darkTheme : lightTheme);
        setIsDarkMode(theme === lightTheme);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};