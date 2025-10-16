import { createContext, useEffect, useState, type ReactNode } from "react";
import type { UserDTO } from "../services/auth";

interface UserContextType {
    user: UserDTO | null;
    setUser: (user: UserDTO | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({children}: { children: ReactNode}) => {
    const [user, setUser] = useState<UserDTO | null>(null);

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
