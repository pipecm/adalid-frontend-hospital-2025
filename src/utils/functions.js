import { encryptInput } from "./encryption";
import paramList from "../../params.json";
import { getDistance } from "geolib";

const KEY_HOSPITAL_USER = "hospital_user";
const QUOTES_REGEX = /['"]+/g;
const KEY_LATITUDE = "hospital_location_latitude";
const KEY_LONGITUDE = "hospital_location_longitude";
const KEY_VALUE = "value";
const DOT = ".";
const COMMA = ",";

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
    return sessionStorage.getItem(KEY_HOSPITAL_USER);
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

export const getDistanceToHospital = (userLatitude, userLongitude) => {
    const hospitalLocation = { 
        latitude: parseFloat(getParameterValue(KEY_LATITUDE)),
        longitude: parseFloat(getParameterValue(KEY_LONGITUDE))
    };

    const userLocation = {
        latitude: userLatitude,
        longitude: userLongitude
    };

    let distance = getDistance(hospitalLocation, userLocation) / 1000;
    return distance.toFixed(2).toString().replace(DOT, COMMA);
}

const getParameterValue = (parameterKey) => {
    return paramList.find(p => p.key === parameterKey)[KEY_VALUE];
};