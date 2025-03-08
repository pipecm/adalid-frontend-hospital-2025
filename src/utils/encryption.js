import CryptoJS from "crypto-js";

const SECRET_KEY = "be22L7RF2A5WprQMVX9tb4zYYj1djpY8";

export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const encryptInput = (input) => {
    return CryptoJS.AES.encrypt(input, SECRET_KEY).toString();
};

export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Error al desencriptar los datos", error);
        return null;
    }
};

export const decryptInput = (encryptedInput) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedInput, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } catch (error) {
        console.error("Error al desencriptar los datos", error);
        return null;
    }
};