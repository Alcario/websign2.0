import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingState from './States';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingState label="Validando sesión…" />;
  if (!user) return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  return <Outlet />;
}
