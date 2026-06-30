import React from 'react';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import ThemeToggle from './components/ThemeToggle'; // 👈 Importamos el botón del tema

export default function App() {
  const { selectedMovieId } = useSelector((state) => state.filters);

  return (
    // 👈 Cambiamos el fondo para que responda a luz (bg-slate-50) u oscuro (dark:bg-slate-900)
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 antialiased font-sans flex flex-col justify-between transition-colors duration-300">
      
      {/* Botón flotante para cambiar de tema */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="flex-grow">
        {selectedMovieId ? (
          <MovieDetails />
        ) : (
          <Home />
        )}
      </main>

      <footer className="w-full bg-slate-200/80 dark:bg-slate-950/60 border-t border-slate-300 dark:border-slate-800/80 py-4 mt-12 text-center backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
          <p>
            © {new Date().getFullYear()} Explorador de Películas. Todos los derechos reservados.
          </p>
          <p className="font-medium text-slate-700 dark:text-slate-300">
            Desarrollado por: <span className="text-blue-600 dark:text-blue-400 font-semibold">Luis Vega</span> — <span className="text-indigo-600 dark:text-indigo-400">Klazia</span>
          </p>
        </div>
      </footer>
    </div>
  );
}