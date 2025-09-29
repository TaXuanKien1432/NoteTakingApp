import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import './App.css'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Auth />},
  { path: "/signup", element: <Auth />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router = {router}/>
  </StrictMode>,
)
