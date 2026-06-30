import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetPopularMoviesQuery, useSearchMoviesQuery } from '../app/services/tmdbApi';
import { setPage } from '../features/filters/filtersSlice';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';

export default function Home() {
  const dispatch = useDispatch();
  
  // Extraemos los filtros globales de Redux
  const { searchQuery, selectedGenre, selectedYear, minRating, page, showFavorites } = useSelector((state) => state.filters);
  const favoriteMovies = useSelector((state) => state.favorites.items);

  const isSearching = searchQuery.trim().length > 0;
  const shouldSkipApi = showFavorites;

  // Estados locales para acumular las películas del scroll infinito
  const [accumulatedMovies, setAccumulatedMovies] = useState([]);
  const observerRef = useRef(null);

  // Cada vez que el usuario cambie de filtro o de búsqueda por texto, reiniciamos el acumulador y volvemos a la pág 1
  useEffect(() => {
    setAccumulatedMovies([]);
    dispatch(setPage(1));
  }, [searchQuery, selectedGenre, selectedYear, minRating, showFavorites, dispatch]);

  // Consultas a la API (pasándole la página actual)
  const { data: popularData, error: popularError, isLoading: popularLoading, isFetching: popularFetching } = 
    useGetPopularMoviesQuery(page, { skip: isSearching || shouldSkipApi });

  const { data: searchData, error: searchError, isLoading: searchLoading, isFetching: searchFetching } = 
    useSearchMoviesQuery({ query: searchQuery, page }, { skip: !isSearching || shouldSkipApi });

  const currentData = isSearching ? searchData : popularData;
  const isLoading = !shouldSkipApi && (isSearching ? popularLoading || searchLoading : popularLoading);
  const isFetching = !shouldSkipApi && (isSearching ? searchFetching : popularFetching);
  const error = !shouldSkipApi && (isSearching ? searchError : popularError);

  // Acumular las películas nuevas cuando la API responda
  useEffect(() => {
    if (currentData?.results && !shouldSkipApi) {
      setAccumulatedMovies((prev) => {
        // Evitamos duplicados por si acaso RTK Query re-envía datos idénticos
        const existingIds = new Set(prev.map(m => m.id));
        const filteredNew = currentData.results.filter(m => !existingIds.has(m.id));
        return [...prev, ...filteredNew];
      });
    }
  }, [currentData, shouldSkipApi]);

  // Determinar la fuente base final
  const baseMovies = shouldSkipApi ? favoriteMovies : accumulatedMovies;
  const hasMore = currentData ? page < currentData.total_pages : false;

  // Filtrado avanzado (género, año, rating) aplicado sobre la lista acumulada
  const filteredMovies = baseMovies.filter((movie) => {
    const matchesGenre = selectedGenre ? movie.genre_ids?.includes(Number(selectedGenre)) : true;
    const matchesYear = selectedYear ? movie.release_date?.startsWith(selectedYear) : true;
    const matchesRating = movie.vote_average >= minRating;
    return matchesGenre && matchesYear && matchesRating;
  });

  // Callback del IntersectionObserver para detectar el último elemento en pantalla
  const lastElementRef = useCallback((node) => {
    if (isLoading || isFetching || shouldSkipApi) return;
    
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      // Si el elemento es visible en pantalla y la API dice que hay más páginas disponibles, sumamos 1
      if (entries[0].isIntersecting && hasMore) {
        dispatch(setPage(page + 1));
      }
    });

    if (node) observerRef.current.observe(node);
  }, [isLoading, isFetching, hasMore, page, shouldSkipApi, dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight block">
          LuisMovies 🎥🍿
        </h1>
        <p className="text-sm font-normal text-slate-500 dark:text-slate-400 mt-1 block">
          {showFavorites 
            ? 'Tus películas guardadas como favoritas' 
            : (isSearching ? `Resultados para "${searchQuery}"` : 'Películas populares en tendencia ✮')}
        </p>
      </header>

      <FilterBar />

      {error && (
        <div className="bg-rose-950 border border-rose-800 text-rose-200 p-4 rounded-lg text-center my-6">
          Error al cargar datos. Verifica tu conexión o API Key.
        </div>
      )}

      {filteredMovies.length === 0 && !isLoading && !isFetching && (
        <div className="text-center py-16 bg-slate-800/30 rounded-xl border border-slate-800 text-slate-400">
          <p className="text-lg font-semibold">No hay películas para mostrar</p>
          <p className="text-sm mt-1">
            {showFavorites ? 'Aún no has agregado ninguna película a tus favoritos.' : 'Prueba cambiando los criterios de los filtros.'}
          </p>
        </div>
      )}

      {/* GRILLA DE PELÍCULAS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredMovies.map((movie, index) => {
          // Si es la última película de la lista, le asignamos la referencia del observador
          if (filteredMovies.length === index + 1) {
            return (
              <div ref={lastElementRef} key={movie.id}>
                <MovieCard movie={movie} />
              </div>
            );
          } else {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </div>

      {/* Spinner indicador de carga al hacer scroll */}
      {(isLoading || isFetching) && (
        <div className="flex justify-center py-8 mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}