import React, { useEffect, useState } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Realizar solicitud GET para obtener el historial desde la API
        const response = await axios.get('https://localhost:7270/api/catfact/history'); // Asegúrate de que la URL de la API sea correcta
        setHistory(response.data);
      } catch (error) {
        console.error("Error al obtener historial:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Historial de Búsquedas</h2>
      <table>
        <thead>
          <tr>
            <th>Cat Fact</th>
            <th>Query</th>
            <th>GIF URL</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, index) => (
            <tr key={index}>
              <td>{item.fact}</td> {/* Cambiado 'catFact' por 'fact' */}
              <td>{item.query}</td>
              <td>
                <a href={item.gifUrl} target="_blank" rel="noopener noreferrer">Ver Gif</a>
              </td>
              <td>{new Date(item.searchDate).toLocaleString()}</td> {/* Cambiado 'createdAt' por 'searchDate' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
