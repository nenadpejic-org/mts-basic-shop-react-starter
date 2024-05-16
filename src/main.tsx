import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { CartContextProvider } from './contexts/CartContext.tsx'
import { QueryContextProvider } from './contexts/QueryContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartContextProvider>
      <QueryContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryContextProvider>
    </CartContextProvider>
  </React.StrictMode>,
)
