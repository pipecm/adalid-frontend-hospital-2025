import axios from "axios";
import { decryptData, decryptInput } from "../utils/encryption";
import TokenError from "../errors/TokenError"
import { removeQuotes } from "../utils/functions";

const API_URL = "http://localhost:3001";

export const findUserByUsername = async (username) => {
    const users = await axios.get(`${API_URL + "/users"}`);
    return users.data.find(user => removeQuotes(decryptInput(user.username)) === decryptInput(username));
};

export const getDoctors = async (token, user) => {
    let doctors = await getData("/doctors", token, user);
    return doctors;
};

export const findDoctorByUsername = async (token, user) => {
    let doctors = await getDoctors(token, user);
    return doctors.find(doctor => doctor.username === removeQuotes(decryptInput(user.username)));
};

export const getServices = async (token, user) => {
    let services = await getData("/services", token, user);
    return services;
};

export const createUser = async (newUser) => {
    try {
        const response = await axios.post(`${API_URL + "/users"}`, newUser, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error al crear usuario:`, error);
    }
}

export const createAppointment = async (token, user, appt) => {
    try {
        validateToken(token, user);
        const response = await axios.post(`${API_URL + "/appointments"}`, appt, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.log(`Error al agendar cita:`, error);
    }
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