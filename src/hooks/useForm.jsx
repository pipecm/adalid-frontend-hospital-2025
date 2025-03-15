import { useState } from "react";
import { sanitizeAndEncrypt } from "../utils/functions";

const useForm = (initialValues, validate, onSubmit) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.id]: event.target.value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errorsFound = validate(values);
        setErrors(errorsFound);
        if (!errorsFound || Object.keys(errorsFound).length === 0) {
            let encryptedValues = {};
            for (const [key, value] of Object.entries(values)) {
                encryptedValues[key] = sanitizeAndEncrypt(value);
            }

            setProcessing(true);
            onSubmit(encryptedValues);
            setProcessing(false);
        }
    };
    
    return { values, errors, processing, handleChange, handleSubmit };
};

export default useForm;