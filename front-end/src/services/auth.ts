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

export async function login(email: string, password: string): Promise<UserDTO> {
    const data = await apiFetch<AuthResponse>("/auth/login", {
        method: "POST",
        body: { email, password },
    });
    
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.userDTO));
    return data.userDTO;
}

export async function register(name: string, email: string, password: string): Promise<UserDTO> {
    const data = await apiFetch<AuthResponse>("/auth/register", {
        method: "POST",
        body: { name, email, password },
    });
    
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("user", JSON.stringify(data.userDTO));
    return data.userDTO;
}

