import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DataProvider } from './context/DataContext';
import { Toaster } from 'react-hot-toast';
import ParticlesBackground from './components/common/ParticlesBackground';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider>
        <ParticlesBackground />
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1A2B4A',
              color: '#fff',
              borderRadius: '12px',
            },
          }}
        />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>
);
