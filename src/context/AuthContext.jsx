import { createContext, useContext, useEffect, useState } from "react";
import { decryptData, encryptData } from "../utils/encryption";

const KEY_HOSPITAL_USER = "hospital_user";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(KEY_HOSPITAL_USER);
        if (storedUser) {
            setUser(decryptData(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (role) => {
        const userData = { role };
        setUser(userData);
        const encryptedUser = encryptData(userData);
        localStorage.setItem(KEY_HOSPITAL_USER, encryptedUser);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem(KEY_HOSPITAL_USER);
    }
  
    const value = { user, login, logout, isAuthenticated: !!user, }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p>Cargando...</p> : children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);