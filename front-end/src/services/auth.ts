import { apiFetch } from "./api";

export interface UserDTO {
    id: number;
    name: string;
    email: string;
    profilePicture: string | null;
}

export interface AuthResponse {
    accessToken: string;
    message: string;
    userDTO: UserDTO;
}

export function setToken(accessToken: string) {
    localStorage.setItem("accessToken", accessToken);
}

export function getToken(): string | null {
    return localStorage.getItem("accessToken");
}

export function clearToken() {
    localStorage.removeItem("accessToken");
}

export async function login(email: string, password: string): Promise<UserDTO> {
    const data = await apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
    });
    
    setToken(data.accessToken);
    return data.userDTO;
}

export async function register(name: string, email: string, password: string): Promise<UserDTO> {
    const data = await apiFetch<AuthResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password },
    });
    
    setToken(data.accessToken);
    return data.userDTO;
}

