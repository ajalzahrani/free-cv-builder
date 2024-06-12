import './styles/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';

// const root = createRott.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);

// for testing
// import SelectorMulti from './components/NewDrafts/SelectorMulti';
// const App = () => {
//   return <SelectorMulti />;
// };

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
