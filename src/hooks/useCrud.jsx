import axios from "axios";
import { decryptInput } from "../utils/encryption";

const API_URL = "http://localhost:3001";

const useCrud = (baseEndpoint, token) => {
    const createData = async (data) => {
        try {
            const response = await axios.post(`${API_URL + baseEndpoint}`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(`Error:`, error);
            throw error;
        }
    };

    const findData = async (predicateFilter) => {
        try {
            const response = await axios.get(`${API_URL + baseEndpoint}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                  }
            });
            if (predicateFilter) {
                return response.data.filter(predicateFilter).map(item => decryptItem(item));
            }
            return response.data.map(item => decryptItem(item));
        } catch (error) {
            console.log(`Error:`, error);
            throw error;
        }
    };

    const updateData = async (id, data) => {
        try {
            const response = await axios.put(`${API_URL + baseEndpoint + "/" + id}`, data, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(`Error:`, error);
            throw error;
        }
    };

    const deleteData = async (id) => {
        try {
            const response = await axios.delete(`${API_URL + baseEndpoint + "/" + id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.log(`Error:`, error);
            throw error;
        }
    };

    const decryptItem = (item) => {
        let decrypted = {};
        for (const [k,v] of Object.entries(item)) {
            decrypted[k] = decryptInput(v);
        }
        return decrypted;
    }

    return { createData, findData, updateData, deleteData };
};

export default useCrud;