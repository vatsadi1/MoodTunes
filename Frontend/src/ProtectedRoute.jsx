import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "./features/auth/services/auth.api.js";

const ProtectedAdmin= ({ children, adminOnly = false }) => {

    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function verify() {
            try {
                const res = await getMe();
                setUser(res.user);
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        verify();

    }, []);

    console.log("User:", user);
console.log("Role:", user?.role);
console.log("adminOnly:", adminOnly);

    if (loading) return <h2>Loading...</h2>;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedAdmin;