import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProjectView from './pages/projectView.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ModalProvider } from './context/ModalContext.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectRoute from './pages/ProtectRoute.jsx'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path='/' element={<LoginPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/projects' element={<ProtectRoute element={ProjectView } />} />
          <Route path='/project/:id' element={<ProtectRoute element={ProjectView } />} />
        </Routes>
      </BrowserRouter>
    </ModalProvider>
  </QueryClientProvider>,
)
