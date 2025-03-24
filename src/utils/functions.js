import { encryptInput } from "./encryption";

const KEY_HOSPITAL_USER = "hospital_user";
const QUOTES_REGEX = /['"]+/g;

export const removeQuotes = (quotedString) => {
    return quotedString.replace(QUOTES_REGEX, '');
};

export const sanitizeAndEncrypt = (input) => {
    return encryptInput(sanitize(input));
};

export const sanitize = (input) => {
    if (input) {
        const div = document.createElement("div");
        div.innerText = input;
        return div.innerHTML;
    }
    return undefined;
};

export const sanitizeData = (plainData) => {
    let sanitized = {};
    for (const [key, value] of Object.entries(plainData)) {
        sanitized[key] = sanitize(value);
    }
    return sanitized;
};

export const getStoredUser = () => {
    return localStorage.getItem(KEY_HOSPITAL_USER);
};

export const shuffleList = (list) => { 
    return list.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value); 
}; 

export const validateEmptyFields = (data) => {
    let errors = {};
    for (let key in data) {
        if (key != "id" && !data[key]) {
            errors[key] = `El campo ${key} no puede estar vacío`;
        }
    }
    return errors;
};
