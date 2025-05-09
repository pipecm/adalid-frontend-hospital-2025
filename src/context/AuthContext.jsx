import { createContext, useContext, useEffect, useState } from "react";
import { decryptInput, decryptData, encryptData } from "../utils/encryption";
import { removeQuotes } from "../utils/functions";
import useDatabase from "../hooks/useDatabase";

const SESSION_DURATION_IN_MINUTES = 30;
const MILLIS_PER_MINUTE = 60 * 1000;
const KEY_HOSPITAL_USER = "hospital_user";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const { findBy: findUsers } = useDatabase("users");

    useEffect(() => {
        const storedUser = sessionStorage.getItem(KEY_HOSPITAL_USER);
        if (storedUser) {
            const decryptedUser = decryptData(storedUser);
            setUser(decryptedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const userFound = await findUsers(user => decryptInput(user.email) === decryptInput(email));
        if (userFound) {
            if (decryptInput(password) === removeQuotes(decryptInput(userFound[0].password))) {
                const expiresOn = new Date(Date.now() + (SESSION_DURATION_IN_MINUTES * MILLIS_PER_MINUTE));
                const userData = { 
                    name: removeQuotes(decryptInput(userFound[0].name)),
                    email: removeQuotes(decryptInput(userFound[0].email)),
                    role: removeQuotes(decryptInput(userFound[0].role)),
                    expiresOn: expiresOn 
                };
                setUser(userData);
                const encryptedUser = encryptData(userData);
                sessionStorage.setItem(KEY_HOSPITAL_USER, encryptedUser);
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
        sessionStorage.removeItem(KEY_HOSPITAL_USER);
    }

    const value = { user, login, logout, isAuthenticated: !!user, }

    return (
        <AuthContext.Provider value={value}>
            {loading ? <p>Cargando...</p> : children }
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);