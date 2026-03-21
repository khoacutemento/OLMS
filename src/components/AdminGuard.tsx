import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const AdminGuard = ({ children }: { children: React.ReactNode }) => {
    const { user, isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="auth-spinner" />
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== "Admin") {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
