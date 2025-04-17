import axios from "axios";

const API_URL = "http://localhost:3001";

const useRestApi = (baseEndpoint, token) => {

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
                return response.data.filter(predicateFilter);
            }
            return response.data;
        } catch (error) {
            console.log(`Error:`, error);
            throw error;
        }
    };

    const updateData = async (data) => {
        try {
            const response = await axios.put(`${API_URL + baseEndpoint + "/" + data.id}`, data, {
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
        console.log(`Deleting id: ${id}`);
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

    return { createData, findData, updateData, deleteData };
};

export default useRestApi;