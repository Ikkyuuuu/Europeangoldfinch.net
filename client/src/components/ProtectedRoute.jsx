import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();
    const loc = useLocation();
    if (!user) {
        return <Navigate to="/login" replace state={{ from: loc }} />;
    }
    return children;
}
