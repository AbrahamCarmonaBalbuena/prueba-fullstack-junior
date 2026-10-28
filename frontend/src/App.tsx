import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AppNavbar from './components/Navbar';
import Productos from './pages/Productos';
import Usuarios from './pages/Usuarios';
import Reportes from './pages/Reportes';

// Layout para las páginas que llevan Navbar
function Layout() {
  return (
    <>
      <AppNavbar />
      <div className="container-fluid p-0" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        <Outlet /> {/* Aquí se renderizan las páginas (Dashboard, Productos, etc.) */}
      </div>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      {/* Rutas Protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/reportes" element={<Reportes />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;