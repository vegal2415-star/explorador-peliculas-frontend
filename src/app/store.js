import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from './services/tmdbApi';
import filtersReducer from '../features/filters/filtersSlice';
import favoritesReducer from '../features/favorites/favoritesSlice'; // 👈 Importamos el nuevo reducer

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    filters: filtersReducer,
    favorites: favoritesReducer, // 👈 Registramos el estado de favoritos
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});