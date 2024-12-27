import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import {API_BASE_URL} from "../util/Constants.tsx";
import axios from "axios";

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: string;
    approved: boolean;
    token: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    
    const login = async (username: string, password: string) => {
        const body = {
            username: username,
            password: password,
        };
        
        try {
            
            const response = await axios.post(`${API_BASE_URL}/auth/login/`, body);
            
            const userData: User = {
                id: response.data.user.id,
                username,
                name: response.data.user.name ?? "Unknown", // TODO avisar pessoal do Back para armazenar Nome também.
                email: response.data.user.email,
                role: response.data.user.user_type,
                approved: response.data.user.is_approved,
                token: response.data.token,
            };
            
            setUser(userData);
            localStorage.setItem("authUser", JSON.stringify(userData));
            
            return { success: true, message: "Login realizado com sucesso!" };
        } catch (erro) {
            return { success: false, message: "Credenciais inválidas" };
        }
    };
    
    const logout = () => {
        setUser(null);
        localStorage.removeItem("authUser");
    };
    
    const value: AuthContextType = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}