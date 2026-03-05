import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { Check, Moon, Sun, Zap } from "lucide-react";

/**
 * Página Home - Sistema de Personalização de Temas
 * 
 * Demonstra:
 * - Seleção de temas (Claro, Escuro, Alto Contraste)
 * - Preview ao vivo dos componentes com cada tema
 * - Persistência de preferências em localStorage
 * - Indicadores visuais do tema ativo
 */

export default function Home() {
  const { theme, setTheme } = useTheme();

  const themes = [
    {
      id: "light",
      name: "Claro",
      description: "Tema claro com fundo branco",
      icon: Sun,
      color: "bg-white border-2 border-slate-900",
    },
    {
      id: "dark",
      name: "Escuro",
      description: "Tema escuro com fundo preto",
      icon: Moon,
      color: "bg-slate-900 border-2 border-white",
    },
    {
      id: "high-contrast",
      name: "Alto Contraste",
      description: "Tema de alto contraste para acessibilidade",
      icon: Zap,
      color: "bg-white border-4 border-yellow-400",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-2">Sistema de Personalização de Temas</h1>
          <p className="text-lg text-muted-foreground">
            Escolha seu tema preferido e veja as mudanças em tempo real. Suas preferências serão salvas automaticamente.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Seleção de Temas */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Escolha um Tema</h2>
              <div className="space-y-4">
                {themes.map((t) => {
                  const Icon = t.icon;
                  const isActive = theme === t.id;
                  
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        isActive
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          <span className="font-semibold">{t.name}</span>
                        </div>
                        {isActive && (
                          <Check className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{t.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold mb-2">💾 localStorage</h3>
                <p className="text-sm text-muted-foreground">
                  Seu tema preferido é salvo automaticamente. Feche e reabra a página para ver a persistência em ação!
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content - Preview */}
          <section className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Preview dos Componentes</h2>

            {/* Componentes de Exemplo */}
            <div className="space-y-6">
              {/* Card Exemplo */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-2">Card Component</h3>
                <p className="text-muted-foreground mb-4">
                  Este é um exemplo de card que muda de aparência com o tema selecionado.
                </p>
                <Button variant="default">Botão Primário</Button>
              </Card>

              {/* Botões */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Botões</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default">Primário</Button>
                  <Button variant="secondary">Secundário</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="destructive">Destrutivo</Button>
                </div>
              </div>

              {/* Tipografia */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tipografia</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">EXTRA SMALL</p>
                    <p className="text-xs">Texto extra pequeno</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">SMALL</p>
                    <p className="text-sm">Texto pequeno</p>
                  </div>
                  <div>
                    <p className="text-base text-muted-foreground mb-1">BASE</p>
                    <p className="text-base">Texto base (padrão)</p>
                  </div>
                  <div>
                    <p className="text-lg text-muted-foreground mb-1">LARGE</p>
                    <p className="text-lg">Texto grande</p>
                  </div>
                </div>
              </div>

              {/* Cores */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Paleta de Cores</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <div className="h-16 bg-background border-2 border-border rounded"></div>
                    <p className="text-xs font-semibold">Background</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-card border-2 border-border rounded"></div>
                    <p className="text-xs font-semibold">Card</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-primary rounded"></div>
                    <p className="text-xs font-semibold">Primary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-secondary rounded"></div>
                    <p className="text-xs font-semibold">Secondary</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-accent rounded"></div>
                    <p className="text-xs font-semibold">Accent</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-16 bg-destructive rounded"></div>
                    <p className="text-xs font-semibold">Destructive</p>
                  </div>
                </div>
              </div>

              {/* Informações do Tema Atual */}
              <div className="bg-accent/10 border-2 border-accent rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Tema Atual</h3>
                <p className="text-sm mb-4">
                  Você está usando o tema: <span className="font-bold uppercase">{theme}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Abra o DevTools (F12) e verifique o localStorage para ver como a preferência é armazenada. 
                  Procure pela chave "theme" no Application → Local Storage.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>
            Sistema de Personalização de Temas • Construído com React, TypeScript e Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
