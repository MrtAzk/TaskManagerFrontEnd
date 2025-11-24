import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectView from './pages/projectView.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.jsx'
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProjectView />} />
          <Route path='/project/:id' element={<ProjectView />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  </QueryClientProvider>,
)
