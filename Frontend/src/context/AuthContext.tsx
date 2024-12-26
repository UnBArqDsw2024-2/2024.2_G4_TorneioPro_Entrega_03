import { createContext, useState, useEffect, useContext, ReactNode } from "react";

interface User {
    username: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => { success: boolean; message: string };
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
    
    // TODO provisória até definirmos como será o login e logout.
    const login = (username: string, password: string) => {
        if (username === "admin" && password === "123456") {
            const userData: User = { username: "admin", role: "admin" };
            setUser(userData);
            localStorage.setItem("authUser", JSON.stringify(userData));
            return { success: true, message: "Login realizado com sucesso!" };
        }
        return { success: false, message: "Usuário ou senha inválidos" };
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