import { createSlice } from '@reduxjs/toolkit';

// Intentar cargar los favoritos previamente guardados en el almacenamiento local
const loadFavorites = () => {
  try {
    const serializedFavorites = localStorage.getItem('movie_favorites');
    return serializedFavorites ? JSON.parse(serializedFavorites) : [];
  } catch (e) {
    console.error("Error cargando favoritos desde localStorage", e);
    return [];
  }
};

const initialState = {
  items: loadFavorites(), // Array de objetos de películas completas
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const exists = state.items.find(item => item.id === movie.id);

      if (exists) {
        // Si ya existe, lo removemos (quitar de favoritos)
        state.items = state.items.filter(item => item.id !== movie.id);
      } else {
        // Si no existe, lo agregamos (añadir a favoritos)
        state.items.push(movie);
      }

      // Guardar la lista actualizada de inmediato en el localStorage
      localStorage.setItem('movie_favorites', JSON.stringify(state.items));
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;