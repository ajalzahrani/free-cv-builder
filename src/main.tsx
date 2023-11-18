import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import createRott from 'react-dom/client';
import App from './App';

const root = createRott.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
