import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
    <main className='font-body text-neutral-900'>
    <App />
    </main>
    </React.StrictMode>
)
