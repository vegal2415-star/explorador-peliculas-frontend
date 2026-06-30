import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Clock, Star, Calendar } from 'lucide-react';
import { useGetMovieDetailsQuery } from '../app/services/tmdbApi';
import { clearSelectedMovie } from '../features/filters/filtersSlice';

export default function MovieDetails() {
  const dispatch = useDispatch();
  const { selectedMovieId } = useSelector((state) => state.filters);

  // RTK Query trae automáticamente los detalles de esta película específica
  const { data: movie, isLoading, error } = useGetMovieDetailsQuery(selectedMovieId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-4 bg-rose-950 border border-rose-800 text-rose-200 rounded-lg text-center">
        No se pudieron cargar los detalles de la película.
        <button onClick={() => dispatch(clearSelectedMovie())} className="block mx-auto mt-4 text-white underline">
          Volver al inicio
        </button>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=Sin+Portada';

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Banner de Fondo Transparente */}
      {backdropUrl && (
        <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden opacity-20 pointer-events-none">
          <img src={backdropUrl} alt="" className="w-full h-full object-cover blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 relative z-10">
        {/* Botón Volver */}
        <button
          onClick={() => dispatch(clearSelectedMovie())}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors font-medium bg-slate-800/80 px-4 py-2 rounded-lg backdrop-blur"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </button>

        {/* Bloque Principal Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Póster */}
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 aspect-[2/3] max-w-sm mx-auto md:mx-0">
            <img src={posterUrl} alt={movie.title} className="w-full h-full object-cover" />
          </div>

          {/* Detalles de Texto */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">{movie.title}</h1>
              {movie.tagline && <p className="text-italic text-slate-400 mt-2 text-lg">"{movie.tagline}"</p>}
            </div>

            {/* Fila de Badges / Metadatos */}
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                {movie.vote_average?.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                <Clock className="w-4 h-4 text-blue-400" />
                {movie.runtime} min
              </span>
              <span className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-full">
                <Calendar className="w-4 h-4 text-indigo-400" />
                {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
              </span>
            </div>

            {/* Géneros en chips */}
            <div className="flex flex-wrap gap-2">
              {movie.genres?.map((g) => (
                <span key={g.id} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-md text-xs font-semibold">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Sinopsis */}
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-slate-200">Sinopsis</h2>
              <p className="text-slate-300 leading-relaxed text-base">
                {movie.overview || "No hay sinopsis disponible para esta película."}
              </p>
            </div>

            {/* Actores Principales */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-slate-200">Reparto Principal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {movie.credits?.cast?.slice(0, 4).map((actor) => (
                  <div key={actor.id} className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/30 text-center">
                    <p className="font-bold text-sm text-slate-200 truncate">{actor.name}</p>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}