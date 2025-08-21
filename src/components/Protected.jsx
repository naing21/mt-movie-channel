import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Protected = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return   <p className="text-white flex items-center justify-center">
    <Loader className='w-22 h-22 mt-6 mb-6 animate-spin'/>
    </p>;
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

  return children;
};

export default Protected;
