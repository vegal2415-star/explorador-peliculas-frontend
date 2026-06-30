import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  selectedGenre: '',
  selectedYear: '',
  minRating: 0,
  page: 1,
  selectedMovieId: null,
  showFavorites: false, // 👈 FALSE por defecto para mostrar el catálogo común
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.showFavorites = false; // Desactivar favoritos si el usuario busca algo nuevo
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.page = 1;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
      state.page = 1;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedMovieId: (state, action) => {
      state.selectedMovieId = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovieId = null;
    },
    // 👈 Nueva acción para alternar entre ver el catálogo o ver favoritos
    setShowFavorites: (state, action) => {
      state.showFavorites = action.payload;
      state.page = 1; // Reiniciamos la paginación al cambiar de pestaña
    },
    resetFilters: () => initialState,
  },
});

export const {
  setSearchQuery,
  setSelectedGenre,
  setSelectedYear,
  setMinRating,
  setPage,
  setSelectedMovieId,
  clearSelectedMovie,
  setShowFavorites, // 👈 Exportamos la nueva acción
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;