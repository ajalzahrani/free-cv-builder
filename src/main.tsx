import './styles/index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
// React-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// const root = createRott.createRoot(document.getElementById('root') as HTMLElement);
// root.render(<App />);

// for testing
// import SelectorMulti from './components/NewDrafts/SelectorMulti';
// const App = () => {
//   return <SelectorMulti />;
// };

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 10000 } },
});

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <QueryClientProvider client={queryClient}>
              <App />
              <ToastContainer />
            </QueryClientProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
