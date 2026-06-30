import { useState, useEffect } from 'react';

/**
 * Custom Hook para retrasar el cambio de un valor (Debounce).
 * @param {any} value - El valor que cambia frecuentemente (ej. el texto de un input).
 * @param {number} delay - El tiempo de espera en milisegundos (ej. 400ms).
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 1. Configurar un temporizador para actualizar el valor retrasado
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 2. Limpiar el temporizador si el usuario vuelve a escribir antes de que termine el tiempo
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}