import React, { createContext, useState, useContext, ReactNode } from "react";
import Dark from "../styles/themes/Dark";
import Light from "../styles/themes/Light";
import { DefaultTheme } from "styled-components";

interface IThemeContext {
  toogleTheme(): void;
  theme: DefaultTheme;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<IThemeContext>({} as IThemeContext);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<DefaultTheme>(() => {
    const themeSaved = localStorage.getItem("@agenda:theme");
    if (themeSaved) {
      return JSON.parse(themeSaved);
    } else {
      return Dark;
    }
  });

  const toogleTheme = () => {
    if (theme.title === "dark") {
      setTheme(Light);
      localStorage.setItem("@agenda:theme", JSON.stringify(Light));
    } else {
      setTheme(Dark);
      localStorage.setItem("@agenda:theme", JSON.stringify(Dark));
    }
  };

  return (
    <ThemeContext.Provider value={{ toogleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function useTheme(): IThemeContext {
  const context = useContext(ThemeContext);
  return context;
}

export { ThemeProvider, useTheme };
