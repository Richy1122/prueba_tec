import React, { useState } from 'react';
import CurrentResult from './components/CurrentResult';
import History from './components/History';
import './index.css'; // Asegúrate de tener este archivo creado con estilos

function App() {
  const [activeTab, setActiveTab] = useState('current');

  return (
    <div className="App">
      <h1>Cat Fact & Gif App</h1>
      <div className="tab-buttons">
        <button onClick={() => setActiveTab('current')}>Fact/Gif</button>
        <button onClick={() => setActiveTab('history')}>Historial</button>
      </div>

      {activeTab === 'current' && <CurrentResult />}
      {activeTab === 'history' && <History />}
    </div>
  );
}

export default App;