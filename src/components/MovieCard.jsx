import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import { setSelectedMovieId } from '../features/filters/filtersSlice';
import { toggleFavorite } from '../features/favorites/favoritesSlice';

export default function MovieCard({ movie }) {
  const dispatch = useDispatch();
  
  // Verificamos si esta película específica ya está guardada en favoritos
  const favorites = useSelector((state) => state.favorites.items);
  const isFavorite = favorites.some((item) => item.id === movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sin+Portada';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  // Función para manejar el clic del corazón sin que abra el detalle de la película
  const handleFavoriteClick = (e) => {
    e.stopPropagation(); // 👈 Evita que el clic dispare el onClick del contenedor principal
    dispatch(toggleFavorite(movie));
  };

  return (
    <div 
      onClick={() => dispatch(setSelectedMovieId(movie.id))}
      className="bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-700 hover:scale-[1.02] transition-transform duration-300 flex flex-col justify-between h-full cursor-pointer group relative"
    >
      <div className="relative aspect-[2/3]">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          loading="lazy"
        />
        
        {/* BOTÓN DE CORAZÓN (FAVORITOS) */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 left-2 bg-slate-900/80 p-1.5 rounded-full backdrop-blur text-rose-500 hover:scale-110 transition-transform z-20"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        <div className="absolute top-2 right-2 bg-slate-900/80 px-2 py-0.5 rounded text-amber-400 font-bold text-xs">
          ⭐ {rating}
        </div>
      </div>
      
      <div className="p-3 bg-slate-800 flex-grow flex flex-col justify-between">
        <h3 className="text-sm font-bold text-slate-100 line-clamp-2 mb-1 group-hover:text-blue-400 transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-400">{releaseYear}</p>
      </div>
    </div>
  );
}