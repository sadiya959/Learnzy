import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UnAuthenticatedRoute({ children }) {
  const { isLoggedIn, isLoading, profile } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    // Redirect based role
    if (profile?.role === "teacher") return <Navigate to="/dashboard/teacher" replace />;
    if (profile?.role === "student") return <Navigate to="/dashboard/student" replace />;
    return <Navigate to="/" replace />; 
  }

  return children;
}
