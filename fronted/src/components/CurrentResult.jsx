import React, { useState } from 'react';

const CurrentResult = () => {
  const [fact, setFact] = useState('');
  const [gifQuery, setGifQuery] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [loadingFact, setLoadingFact] = useState(false);
  const [loadingGif, setLoadingGif] = useState(false);
  const [saving, setSaving] = useState(false);

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
      
      if (!response.ok) {
        throw new Error('Error al obtener el dato del gato');
      }
      
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
  
    try {
      setLoadingGif(true);
      const response = await fetch(`https://localhost:7270/api/catfact/gif?query=${encodeURIComponent(gifQuery.trim())}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Error al obtener el GIF');
      }
      
      const data = await response.json();
      setGifUrl(data.url);
    } catch (error) {
      console.error('Error:', error);
      alert("Error en la conexión con el servidor");
    } finally {
      setLoadingGif(false);
    }
  };

  // Función para guardar en el historial
  const handleGuardar = async () => {
    if (!fact || !gifUrl) {
      alert('Por favor genera un Cat Fact y un Gif primero.');
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(`https://localhost:7270/api/catfact/save?fact=${encodeURIComponent(fact)}&query=${encodeURIComponent(gifQuery)}&gifUrl=${encodeURIComponent(gifUrl)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Error al guardar en el historial');
      }
      
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
    <div style={{ 
      maxWidth: '600px', 
      margin: '20px auto', 
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      {/* 1. Botón y Cat Fact */}
      <button 
        onClick={fetchCatFact}
        disabled={loadingFact}
        style={{ 
          width: '100%', 
          padding: '12px',
          backgroundColor: loadingFact ? '#cccccc' : '#4CAF50',
          color: 'white', 
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {loadingFact ? 'Cargando...' : 'Traer Cat Fact'}
      </button>
      
      {fact && (
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <p><strong>Dato del gato:</strong> {fact}</p>
        </div>
      )}

      {/* 2. Input de búsqueda de gif y botón */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Palabra clave para el gif"
          value={gifQuery}
          onChange={(e) => setGifQuery(e.target.value)}
          style={{ 
            width: '100%', 
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
        <button 
          onClick={fetchGif}
          disabled={loadingGif}
          style={{ 
            width: '100%', 
            marginTop: '10px', 
            padding: '12px',
            backgroundColor: loadingGif ? '#cccccc' : '#2196F3',
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loadingGif ? 'Buscando...' : 'Generar Gif'}
        </button>
      </div>

      {/* Visualización del GIF */}
      {gifUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ marginBottom: '10px' }}>GIF Resultado:</h4>
          <img 
            src={gifUrl} 
            alt="GIF buscado"
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              border: '1px solid #ddd',
              borderRadius: '4px'
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <a 
              href={gifUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#2196F3' }}
            >
              Abrir GIF en nueva pestaña
            </a>
          </div>
        </div>
      )}

      {/* 3. Botón de Guardar */}
      <button 
        onClick={handleGuardar}
        disabled={saving || !fact || !gifUrl}
        style={{ 
          width: '100%', 
          padding: '12px',
          backgroundColor: saving ? '#cccccc' : '#FF9800',
          color: 'white', 
          border: 'none',
          borderRadius: '4px',
          cursor: saving ? 'not-allowed' : 'pointer'
        }}
      >
        {saving ? 'Guardando...' : 'Guardar en historial'}
      </button>
    </div>
  );
};

export default CurrentResult;