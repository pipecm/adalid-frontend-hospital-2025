import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        // Redirigir al login si no está autenticado
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirigir al inicio si no tiene permisos
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;