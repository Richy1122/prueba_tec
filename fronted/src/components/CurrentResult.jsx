import React, { useState, useEffect } from 'react';

const CurrentResult = () => {
  const [fact, setFact] = useState('');
  const [gifQuery, setGifQuery] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [loadingFact, setLoadingFact] = useState(false);
  const [loadingGif, setLoadingGif] = useState(false);
  const [saving, setSaving] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0); // Para forzar refresco

  // Validación de 3 palabras
  const validateQuery = (query) => {
    const words = query.trim().split(/\s+/);
    return words.length <= 3;
  };

  // Obtener el Cat Fact con fetch
  const fetchCatFact = async () => {
    try {
      setLoadingFact(true);
      const response = await fetch('https://localhost:7270/api/catfact/fact', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) throw new Error('Error al obtener el dato del gato');
      
      const data = await response.json();
      setFact(data.fact);
    } catch (error) {
      console.error('Error al obtener Cat Fact:', error);
      alert('Error al obtener el dato del gato');
    } finally {
      setLoadingFact(false);
    }
  };

  // Obtener el GIF con fetch
  const fetchGif = async () => {
    if (!gifQuery.trim()) {
      alert('Ingresa una palabra clave.');
      return;
    }

    if (!validateQuery(gifQuery)) {
      alert('Por favor ingresa máximo 3 palabras.');
      return;
    }
  
    try {
      setLoadingGif(true);
      const timestamp = Date.now();
      const response = await fetch(
        `https://localhost:7270/api/catfact/gif?query=${encodeURIComponent(gifQuery.trim())}&refresh=${refreshCounter}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) throw new Error('Error al obtener el GIF');
      
      const data = await response.json();
      setGifUrl(data.url);
    } catch (error) {
      console.error('Error:', error);
      alert("Error en la conexión con el servidor");
    } finally {
      setLoadingGif(false);
    }
  };

  // Refrescar el GIF
  const refreshGif = () => {
    setRefreshCounter(prev => prev + 1); // Esto forzará un nuevo fetch
  };

  // Función para guardar en el historial
  const handleGuardar = async () => {
    if (!fact || !gifUrl) {
      alert('Por favor genera un Cat Fact y un Gif primero.');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(
        `https://localhost:7270/api/catfact/save?fact=${encodeURIComponent(fact)}&query=${encodeURIComponent(gifQuery)}&gifUrl=${encodeURIComponent(gifUrl)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) throw new Error('Error al guardar en el historial');
      
      const result = await response.json();
      alert('¡Datos guardados exitosamente en el historial!');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar en el historial');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="current-result-container">
      {/* 1. Botón y Cat Fact */}
      <button 
        onClick={fetchCatFact}
        disabled={loadingFact}
        className="cat-fact-button"
      >
        {loadingFact ? 'Cargando...' : 'Traer Cat Fact'}
      </button>
      
      {fact && (
        <div className="cat-fact-display">
          <p><strong>Dato del gato:</strong> {fact}</p>
        </div>
      )}

      {/* 2. Input de búsqueda de gif y botón */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Máximo 3 palabras para el gif"
          value={gifQuery}
          onChange={(e) => setGifQuery(e.target.value)}
          className="gif-search-input"
        />
        <button 
          onClick={fetchGif}
          disabled={loadingGif}
          className="gif-search-button"
        >
          {loadingGif ? 'Buscando...' : 'Generar Gif'}
        </button>
      </div>

      {/* Visualización del GIF */}
      {gifUrl && (
        <div className="gif-result-container">
          <h4 style={{ marginBottom: '10px', color: '#d23369' }}>GIF Resultado:</h4>
          <img 
            src={gifUrl} 
            alt="GIF buscado"
            className="gif-image"
            key={refreshCounter}
          />

        </div>
      )}

      {/* 3. Botón de Guardar */}
      <button 
        onClick={handleGuardar}
        disabled={saving || !fact || !gifUrl}
        className="save-button"
      >
        {saving ? 'Guardando...' : 'Guardar en historial'}
      </button>
    </div>
  );
};

export default CurrentResult;