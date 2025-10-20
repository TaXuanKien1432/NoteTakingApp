import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { apiFetch } from '../services/api';
import type { UserDTO } from '../services/auth';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const { setUser } = useContext(UserContext)!;
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("accessToken");
            if (!token) {
                setAuthorized(false);
                setLoading(false);
                return;
            }

            try {
                const userDTO = await apiFetch<UserDTO>("/auth/me", { method: "GET" });
                setUser(userDTO);
                setAuthorized(true);
            } catch (err) {
                console.warn("Invalid or expired token:", err);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                setAuthorized(false);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, [setUser]);
    if (loading) {
        return <div className="text-center mt-10">Checking session...</div>
    }
    if (!authorized) {
        return <Navigate to="/" replace/>
    }
    return <>{children}</>
}

export default ProtectedRoute