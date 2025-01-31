import axios from "axios";

export const findAllServices = async () => {
    let servicesList = await findAll("http://localhost:5173/data/services.json");
    testRandomError();
    return servicesList;
};

export const findAllDoctors = async () => {
    let doctorsList = await findAll("http://localhost:5173/data/doctors.json");
    return doctorsList;
};

const findAll = async (baseUrl) => {
    const restClient = axios.create({
        baseURL: baseUrl,
        timeout: 1000
    });

    try {
        let response = await restClient.get();
        return response.data;
    } catch (error) {
        throw new Error("Error al obtener los datos: ", error);
    }
};

const testRandomError = () => {
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber % 3 === 0) {
        throw new Error("500 Internal Server Error");
    }
};