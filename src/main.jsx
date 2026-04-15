import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '@/app/store.js'
import { ThemeProvider } from '@/context/ThemeContext.jsx'
import { LoaderProvider } from '@/context/LoaderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <LoaderProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LoaderProvider>
    </ThemeProvider>
  </StrictMode>,
)
