import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Auth from './pages/Auth.tsx'
import './App.css'
import Home from './pages/Home.tsx'
import { UserContextProvider } from './contexts/UserContext.tsx'
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import StartPage from './pages/StartPage.tsx'

const router = createBrowserRouter([
  { path: "/", element: <StartPage /> },
  { path: "/login", element: <Auth />},
  { path: "/signup", element: <Auth />},
  { path: "/home", element: (
    <ProtectedRoute>
      <Home />
    </ProtectedRoute>
  )},
  { path: "/oauth2/redirect", element: <OAuth2RedirectHandler />}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router = {router}/>
    </UserContextProvider>
  </StrictMode>,
)
