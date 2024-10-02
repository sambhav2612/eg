import { Navigate, Outlet } from 'react-router-dom';

export function TokenUnavailable() {
  const token = localStorage.getItem('__TOKEN');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export function TokenAvailable() {
  const token = localStorage.getItem('__TOKEN');
  if (token) {
    return <Navigate to="/welcome" replace />;
  }
  return <Outlet />;
}
