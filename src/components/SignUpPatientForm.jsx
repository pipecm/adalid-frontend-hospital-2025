import { useState } from "react";
import Modal from "./Modal";
import useForm from "../hooks/useForm";
import { validateEmptyFields } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import { createUser } from "../client/api";

const SignUpPatientForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState(undefined);
    const [submitError, setSubmitError] = useState(undefined);
 
    const navigate = useNavigate();

    const validate = (values) => {
        setSubmitted(true);
        let validationErrors = validateEmptyFields(values);
        if (values.password != confirmPwd) {
            validationErrors["password"] = "Las claves ingresadas no coinciden";
        }
        return validationErrors;
    };

    const onSubmit = async (encryptedValues) => {
        try {
            const response = await createUser(encryptedValues);
            console.log(`Response: ${JSON.stringify(response)}`);
            setSubmitError(undefined);
            setSubmitted(true);
        } catch (error) {
            setSubmitError(`Error al crear usuario: ${error.message}`);
        }
    };

    const { errors, handleChange, handleSubmit } = useForm(
        { name: "", email: "", password: "", role: "patient" }, validate, onSubmit, () => {}, true
    );

    const hasError = () => {
        return (Object.keys(errors).length > 0) || !!submitError;
    };

    const redirectToLogin = () => {
        document.getElementById("patient-form").reset();
        setSubmitted(false);
        navigate("/login");
    };
    
    return (
        <div className='card mt-5' id="sign-up-patient">
            <h2>Registro de Nuevo Paciente</h2>
            <div className="card-body">
                <form id="patient-form" className="contact-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" name="name" id="name" className="form-control" placeholder="Nombre" onChange={handleChange} autoFocus />
                    </div>
                    <div className="mb-3">
                        <input type="email" name="email" id="email" className="form-control" placeholder="Email" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" name="password" id="password" className="form-control" placeholder="Clave" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="password" name="confirm-pwd" id="confirm-pwd" className="form-control" placeholder="Confirmar clave" onChange={(e) => setConfirmPwd(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
            <div className="card-body">
                {submitted && !hasError() && (
                    <Modal onClose={redirectToLogin}>
                        <img className="modal-icon" src="../../images/icon_ok.svg" alt="OK" />
                        <h4>Paciente registrado exitosamente</h4>
                    </Modal>
                )}
                {submitted && hasError() && (
                    <Modal onClose={() => setSubmitted(false)}>
                        <img className="modal-icon" src="../../images/icon_error.svg" alt="Error" />
                        <h4>Error al registrar paciente</h4>
                        <ul>
                            {submitError && <li>{submitError}</li>}
                            {Object.keys(errors).map(errorKey => <li key={errorKey}>{errors[errorKey]}</li>)}
                        </ul>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default SignUpPatientForm;