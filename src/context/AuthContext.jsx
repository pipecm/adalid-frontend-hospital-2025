import { createContext, useContext, useEffect, useState } from "react";
import { decryptInput, decryptData, encryptData } from "../utils/encryption";
import { findUserByEmail } from "../client/api";
import { removeQuotes } from "../utils/functions";

const SESSION_DURATION_IN_MINUTES = 30;
const MILLIS_PER_MINUTE = 60 * 1000;
const KEY_HOSPITAL_USER = "hospital_user";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem(KEY_HOSPITAL_USER);
        if (storedUser) {
            const decryptedUser = decryptData(storedUser);
            setUser(decryptedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const userFound = await findUserByEmail(email);
        if (userFound) {
            if (decryptInput(password) === removeQuotes(decryptInput(userFound.password))) {
                const expiresOn = new Date(Date.now() + (SESSION_DURATION_IN_MINUTES * MILLIS_PER_MINUTE));
                const userData = { 
                    name: removeQuotes(decryptInput(userFound.name)),
                    email: removeQuotes(decryptInput(userFound.email)),
                    role: removeQuotes(decryptInput(userFound.role)),
                    expiresOn: expiresOn 
                };
                setUser(userData);
                const encryptedUser = encryptData(userData);
                localStorage.setItem(KEY_HOSPITAL_USER, encryptedUser);
                return userData;
            } else {
                throw new Error("Invalid credentials")
            } 
        } else {
            throw new Error("User not found!");
        }
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