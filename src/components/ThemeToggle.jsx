import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  // 1. Inicializar el estado revisando el localStorage o la preferencia del sistema
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // 2. Aplicar el tema inyectando la clase en el elemento HTML raíz
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 text-slate-100 p-2.5 rounded-full shadow-md hover:scale-105 transition-transform duration-200 border border-slate-700 dark:border-slate-600 cursor-pointer"
      title={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
      ) : (
        <Moon className="w-5 h-5 text-indigo-400 fill-indigo-400" />
      )}
    </button>
  );
}