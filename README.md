# Explorador de Películas - Prueba Técnica Frontend

Una aplicación moderna y responsiva para la exploración y búsqueda de películas, desarrollada en **React** con **Vite**. Este proyecto consume datos en tiempo real de la API de **The Movie Database (TMDB)**, gestionando el estado global mediante **Redux Toolkit** y optimizando el manejo de peticiones asíncronas con **RTK Query**.

---

## 🚀 Características Principales

- **Catálogo de Tendencias:** Listado dinámico de películas populares consumido directamente desde la API.
- **Buscador Avanzado:** Barra de búsqueda optimizada para encontrar títulos específicos por texto.
- **Filtrado Combinado:** Permite clasificar las películas interconectando simultáneamente criterios de **Género**, **Año de lanzamiento** y **Calificación mínima**.
- **Vista Detallada:** Información extendida de cada producción incluyendo sinopsis, reparto principal (actores), duración, fecha y puntuación.
- **Paginación Integrada:** Control de navegación de páginas integrado directamente con la paginación nativa de la API.

### 🌟 Bonus & Optimizaciones Implementadas
- **Sistema de Favoritos Completo:** Persistencia de datos local utilizando `localStorage` para almacenar las películas preferidas del usuario.
- **Pestaña de Mis Favoritos:** Vista dedicada que hereda las capacidades del filtrado avanzado sobre la lista guardada por el usuario.
- **Optimización de Rendimiento (Debounce):** Custom Hook `useDebounce` integrado en el buscador que reduce el número de peticiones innecesarias a la API (espera de 450ms), mejorando el uso de red y los tiempos de renderizado.
- **Interfaz Moderna y Responsive:** Diseño adaptativo para dispositivos móviles, tablets y escritorio estilizado con **Tailwind CSS (v4)**.

---

## 🛠️ Tecnologías y Herramientas

- **React 18** & **Vite** (Entorno de desarrollo ultra rápido).
- **Redux Toolkit** (Gestión de estado global y slices).
- **RTK Query** (Manejo de caché, sincronización y peticiones a la API).
- **Tailwind CSS v4** (Estilos y grillas responsivas).
- **Lucide React** (Paquete de iconos limpios).

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── store.js             # Configuración central del Store de Redux
│   └── services/
│       └── tmdbApi.js       # Endpoints y consultas base con RTK Query
├── components/              # Componentes de UI reutilizables
│   ├── FilterBar.jsx        # Barra de búsqueda, pestañas de favoritos y selectores
│   ├── MovieCard.jsx        # Tarjeta individual con acción de favoritos
│   
├── features/                # Slices de Redux Toolkit organizados por características
│   ├── filters/
│   │   └── filtersSlice.js  # Estado global de inputs, páginas y vistas
│   └── favorites/
│       └── favoritesSlice.js # Control de almacenamiento de favoritos
├── hooks/                   # Custom Hooks globales
│   └── useDebounce.js       # Hook para optimizar el rendimiento del input
├── pages/                   # Vistas principales de la aplicación
│   ├── Home.jsx             # Contenedor del catálogo principal y su lógica
│   └── MovieDetails.jsx     # Interfaz detallada de la película seleccionada
├── App.jsx                  # Enrutador/Layout dinámico principal
└── main.jsx                 # Punto de entrada y proveedor del Store de Redux



👨‍💻 Autor / Estudiante

- **Nombre:** Luis Felipe Vega Paez
- **Universidad:** Klazia
- **Asignatura / Convocatoria:** Prueba Técnica - Desarrollo Frontend (2026)