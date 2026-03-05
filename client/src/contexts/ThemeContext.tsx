import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Contexto de Tema - Sistema de Personalização de Temas
 * 
 * Suporta três temas:
 * - 'light': Tema claro com fundo branco
 * - 'dark': Tema escuro com fundo preto
 * - 'high-contrast': Tema de alto contraste (preto e amarelo)
 * 
 * As preferências são salvas em localStorage automaticamente.
 */

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
  switchable = true,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      if (stored && ["light", "dark", "high-contrast"].includes(stored)) {
        return stored as Theme;
      }
    }
    return defaultTheme;
  });

  const [mounted, setMounted] = useState(false);

  // Aplicar tema ao DOM quando o componente monta ou o tema muda
  useEffect(() => {
    const root = document.documentElement;
    
    // Remover todas as classes de tema
    root.classList.remove("light", "dark", "high-contrast");
    
    // Adicionar a nova classe de tema (exceto 'light' que é o padrão)
    if (theme !== "light") {
      root.classList.add(theme);
    }

    // Salvar em localStorage se switchable
    if (switchable) {
      localStorage.setItem("theme", theme);
    }

    setMounted(true);
  }, [theme, switchable]);

  // Atualizar tema
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  // Alternar entre temas em sequência
  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "high-contrast"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Evitar flash de conteúdo com tema incorreto
  if (!mounted && switchable) {
    return <>{children}</>;
  }

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
