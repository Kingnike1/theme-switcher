import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "high-contrast";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (switchable && typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored && ["light", "dark", "high-contrast"].includes(stored)) {
        return stored as Theme;
      }
    }
    return defaultTheme;
  });

  // Aplicar tema ao DOM
  useEffect(() => {
    const root = document.documentElement;
    // Remover todas as classes de tema
    root.classList.remove("light", "dark", "high-contrast");
    
    // Adicionar a classe do tema atual (exceto 'light' que é o padrão)
    if (theme !== "light") {
      root.classList.add(theme);
    }

    // Salvar em localStorage
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  // Atualizar tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Alternar entre temas
  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "high-contrast"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }
  return context;
}
