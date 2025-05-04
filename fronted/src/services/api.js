import axios from 'axios';

// Define la URL de tu API
const API_URL = 'http://localhost:7270/api/history'; // Asegúrate de ajustar esta URL según tu backend

// Función para obtener un Cat Fact desde el backend
export const getCatFact = async () => {
  try {
    const response = await axios.get('/api/catfact/fact'); // Ajusta esta URL según tu configuración
    return response;
  } catch (error) {
    console.error('Error obteniendo el Cat Fact', error);
    throw error;
  }
};

// Función para obtener un Gif relacionado desde el backend
export const getGif = async (query) => {
    try {
      const response = await axios.get('/api/gif', {
        params: { query } // Axios se encarga de codificar la URL automáticamente
      });
      return response.data; // Devuelve directamente los datos parseados
    } catch (error) {
      console.error('Error obteniendo el GIFcito:', error);
      throw error; // Axios ya incluye detalles del error (status code, mensaje, etc.)
    }
  };

// Función para obtener el historial de búsquedas
export const getHistory = async () => {
    try {
      const response = await axios.get(API_URL);
      return response;
    } catch (error) {
      console.error("Error al obtener historial:", error);
      throw error;
    }};