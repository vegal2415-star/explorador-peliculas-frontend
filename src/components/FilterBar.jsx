import React, { useState, useEffect } from 'react'; // 👈 Añadimos useState y useEffect
import { useDispatch, useSelector } from 'react-redux';
import { Search, RotateCcw, Film, Heart } from 'lucide-react';
import { 
  setSearchQuery, 
  setSelectedGenre, 
  setSelectedYear, 
  setMinRating, 
  setShowFavorites, 
  resetFilters 
} from '../features/filters/filtersSlice';
import { useGetGenresQuery } from '../app/services/tmdbApi';
import useDebounce from '../hooks/useDebounce'; // 👈 Importamos nuestro custom hook

export default function FilterBar() {
  const dispatch = useDispatch();
  
  const { searchQuery, selectedGenre, selectedYear, minRating, showFavorites } = useSelector((state) => state.filters);
  const favoriteItems = useSelector((state) => state.favorites.items);
  const { data: genresData } = useGetGenresQuery();

  // 1. Estado local temporal para el input de texto
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // 2. Aplicamos el debounce (esperar 450ms después de que el usuario deje de escribir)
  const debouncedSearchTerm = useDebounce(searchTerm, 450);

  // 3. Sincronizar el input con Redux cuando se complete el tiempo del Debounce
  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  // Sincronizar el input local hacia atrás si se limpian los filtros desde el botón
  useEffect(() => {
    if (searchQuery === '') {
      setSearchTerm('');
    }
  }, [searchQuery]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(40), (val, index) => currentYear - index);

  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-md mb-8 space-y-4">
      
      {/* Pestañas de Vista */}
      <div className="flex border-b border-slate-700 gap-2 pb-2">
        <button
          onClick={() => dispatch(setShowFavorites(false))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            !showFavorites ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Film className="w-4 h-4" />
          Explorar Catálogo
        </button>
        
        <button
          onClick={() => dispatch(setShowFavorites(true))}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            showFavorites ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
          }`}
        >
          <Heart className={`w-4 h-4 ${showFavorites ? 'fill-white' : ''}`} />
          Mis Favoritos ({favoriteItems.length})
        </button>
      </div>

      {/* Input de Búsqueda con estado local inmediato */}
      {!showFavorites && (
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar películas por título..."
            value={searchTerm} // 👈 Conectado al estado instantáneo local
            onChange={(e) => setSearchTerm(e.target.value)} // 👈 Cambia al instante en pantalla
            className="w-full pl-11 pr-4 py-2.5 bg-slate-700 text-slate-100 placeholder-slate-400 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
          />
        </div>
      )}

      {/* Selectores */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Género</label>
          <select
            value={selectedGenre}
            onChange={(e) => dispatch(setSelectedGenre(e.target.value))}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todos los géneros</option>
            {genresData?.genres?.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Año</label>
          <select
            value={selectedYear}
            onChange={(e) => dispatch(setSelectedYear(e.target.value))}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
          >
            <option value="">Todos los años</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Calificación</label>
          <select
            value={minRating}
            onChange={(e) => dispatch(setMinRating(Number(e.target.value)))}
            className="w-full p-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:outline-none focus:border-blue-500"
          >
            <option value="0">Cualquier puntuación</option>
            <option value="7">⭐ 7+ (Buenas)</option>
            <option value="8">⭐ 8+ (Excelentes)</option>
          </select>
        </div>

  <button
  onClick={() => dispatch(resetFilters())}
  className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-blue-600 text-white font-medium p-2 rounded-lg transition-colors border border-slate-600 shadow"
>
  <RotateCcw className="w-4 h-4" />
  Limpiar Filtros
</button>
      </div>
    </div>
  );
}