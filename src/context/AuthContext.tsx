// src/context/AuthContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
    userAdmin: boolean;
    setIsUserAdmin: (isAdmin: boolean) => void;
    isUserAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userAdmin, setUserAdmin] = useState<boolean>(false);

    const setIsUserAdmin = (isAdmin: boolean) => {
        setUserAdmin(isAdmin);
    };

    const isUserAdmin = () => {
        return userAdmin;
    };

    return (
        <AuthContext.Provider value={{ userAdmin, setIsUserAdmin, isUserAdmin }}>
    {children}
    </AuthContext.Provider>
);
};

// Custom Hook to use the Auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
