import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import './App.css'
import Home from './pages/Home.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Auth />},
  { path: "/signup", element: <Auth />},
  { path: "/home", element: <Home />},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router = {router}/>
    </UserContextProvider>
  </StrictMode>,
)
