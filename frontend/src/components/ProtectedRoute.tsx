import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const token = localStorage.getItem('access_token');
  
  // Si no hay token, lo mandamos al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, mostramos la ruta (Outlet)
  return <Outlet />;
}