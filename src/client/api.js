import axios from "axios";
import { decryptData } from "../utils/encryption";
import TokenError from "../errors/TokenError"

const API_URL = "http://localhost:3001";

export const getDoctors = async (token, user) => {
    let doctors = await getData("/doctors", token, user);
    return doctors;
};

export const getServices = async (token, user) => {
    let services = await getData("/services", token, user);
    return services;
};

const validateToken = (token, user) => {
    if (!user || Date.now() > user['expiresOn']) {
        throw new TokenError("Sesión expirada!");
    }

    try {
        const decryptedToken = decryptData(token);
        if (decryptedToken['role'] != user['role']) {
            throw new TokenError("Token inválido!");
        }
    } catch (error) {
        console.log(error);
        alert("Error al desencriptar token");
    }
}

const getData = async (endpoint, token, user) => {
    try {
        validateToken(token, user);

        const response = await axios.get(`${API_URL + endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
 
        return response.data;
    } catch (error) {
        console.error("Error al obtener datos desde la API:", error);
        throw error;
    }
};
