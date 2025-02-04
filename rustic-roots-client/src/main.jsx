import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';

import Router from './Router/Router.jsx';
import AuthProvider from './Providers/AuthProvider.jsx';
import ThemeProvider from './Providers/ThemeProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      
    <AuthProvider routes={<RouterProvider router={Router}></RouterProvider>} />
    

    </ThemeProvider>
    
  </StrictMode>
)
