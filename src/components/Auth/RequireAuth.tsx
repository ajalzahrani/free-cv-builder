import { useLocation, Navigate, Outlet } from 'react-router-dom';
// import useAuth from "../hooks/useAuth";
import useAuthStore from '~/store/authStore';

// Track if user logged in or not
const RequireAuth = ({ allowedRoles }: { allowedRoles: number[] }) => {
  // const { auth } = useAuth();
  const { auth } = useAuthStore();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
