import { useContext, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const token = localStorage.getItem('accessToken');

  if (!user || !isAuthenticated || !token) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
