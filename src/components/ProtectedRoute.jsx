import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const  ProtectedRoute =  ({children, redirectTo = "/login", allowedRoles = []}) => {
  const { isLoggedIn, isLoading, profile } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // Role
  if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}


export default ProtectedRoute