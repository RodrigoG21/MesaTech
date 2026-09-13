import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from '@azure/msal-react';
import { AUTH_ENABLED } from './authConfig';
import { useAuth } from './hooks/useAuth';
import { Sidebar } from './components/Sidebar';
import Login from './pages/Login';
import ClienteDashboard from './pages/ClienteDashboard';
import NuevaSolicitud from './pages/NuevaSolicitud';
import OperadorDashboard from './pages/OperadorDashboard';
import AdminCatalogo from './pages/AdminCatalogo';

function AppRoutes() {
  const { isAuthenticated, role } = useAuth();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const msalAuth = AUTH_ENABLED ? useIsAuthenticated() : true;
  const authed = AUTH_ENABLED ? msalAuth : isAuthenticated;

  if (!authed) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  const defaultPath =
    role === 'ADMINISTRADOR' || role === 'OPERADOR'
      ? '/solicitudes'
      : '/mis-solicitudes';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Routes>
          <Route path="/" element={<Navigate to={defaultPath} replace />} />
          <Route path="/mis-solicitudes" element={<ClienteDashboard />} />
          <Route path="/nueva-solicitud" element={<NuevaSolicitud />} />
          <Route
            path="/solicitudes"
            element={
              role === 'ADMINISTRADOR' || role === 'OPERADOR' ? (
                <OperadorDashboard />
              ) : (
                <Navigate to="/mis-solicitudes" replace />
              )
            }
          />
          <Route
            path="/catalogo"
            element={
              role === 'ADMINISTRADOR' ? (
                <AdminCatalogo />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to={defaultPath} replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
