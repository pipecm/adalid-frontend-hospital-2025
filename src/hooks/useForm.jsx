import { useState } from "react";
import { sanitizeData } from "../utils/functions";
import { encryptInput } from "../utils/encryption";

const useForm = (initialValues, validate, onSubmit, onClose, encrypt) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.id]: event.target.value});
    };

    const encryptData = (plainData) => {
        let encryptedData = {};
        for (const [key, value] of Object.entries(plainData)) {
            encryptedData[key] = encryptInput(value);
        }
        return encryptedData;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues(sanitizeData(values));
        const errorsFound = validate(values);
        setErrors(errorsFound);
        if (!errorsFound || Object.keys(errorsFound).length === 0) {
            let encryptedValues;
            if (encrypt) {
                encryptedValues = encryptData(values);
            }
           
            setProcessing(true);
            onSubmit(encrypt ? encryptedValues : values);
            setProcessing(false);
            onClose();
        }
    };
    
    return { values, errors, processing, handleChange, handleSubmit };
};

export default useForm;