import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Cambia este string por tu clave API de TMDB (la corta de 32 caracteres)
const API_KEY = '8a29e5ae610bf5d9f9343cc384e28baf'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    // 1. Obtener películas populares
    getPopularMovies: builder.query({
      query: (page = 1) => `/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`,
    }),
    
    // 2. Buscar películas por título
    searchMovies: builder.query({
      query: ({ query, page = 1 }) => 
        `/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=es-ES&page=${page}`,
    }),
    
    // 3. Obtener detalles de una película específica
    getMovieDetails: builder.query({
      query: (movieId) => `/movie/${movieId}?api_key=${API_KEY}&language=es-ES&append_to_response=credits`,
    }),
    
    // 4. Obtener géneros
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${API_KEY}&language=es-ES`,
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetGenresQuery,
} = tmdbApi;