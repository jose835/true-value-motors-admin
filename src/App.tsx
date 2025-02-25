import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import { useAuth } from './api/auth-provider';
import { JSX } from 'react';
import Login from './pages/login';

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  return user ? element : <Navigate to="/" replace />;
};

function App() {
  const { user } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Navigate to="/home" replace /> : <Login />,
    },
    {
      path: '/home',
      element: <ProtectedRoute element={<Home />} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
