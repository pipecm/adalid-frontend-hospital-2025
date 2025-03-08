import { encryptInput } from "./encryption";

const QUOTES_REGEX = /['"]+/g;

export const removeQuotes = (quotedString) => {
    return quotedString.replace(QUOTES_REGEX, '');
};

export const sanitizeAndEncrypt = (input) => {
    if (input) {
        const div = document.createElement("div");
        div.innerText = input;
        return encryptInput(div.innerHTML);
    }
    return undefined;
};