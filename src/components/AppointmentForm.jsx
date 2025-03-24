import { useState } from "react";
import Modal from "./Modal";
import { createAppointment } from "../client/api";
import { getStoredUser, validateEmptyFields } from "../utils/functions";
import { useAuth } from "../context/AuthContext";
import useForm from "../hooks/useForm";

const AppointmentForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(undefined);

    const { user: authenticatedUser } = useAuth();

    const validate = (values) => {
        setSubmitted(true);
        let validationErrors = validateEmptyFields(values);
        return validationErrors;
    };

    const onSubmit = async (encryptedValues) => {
        const currentUser = getStoredUser();

        try {
            const response = await createAppointment(currentUser, authenticatedUser, encryptedValues);
            console.log(`Response: ${JSON.stringify(response)}`);
            setSubmitError(undefined);
            setSubmitted(true);
        } catch (error) {
            setSubmitError(`Error al crear cita médica: ${error.message}`);
        }
    };

    const { values, errors, handleChange, handleSubmit } = useForm(
        { patient: authenticatedUser["name"], email: authenticatedUser["email"], specialty: "", message: "" }, validate, onSubmit, () => {}, true
    );

    const hasError = () => {
        return (Object.keys(errors).length > 0) || !!submitError;
    };

    const cleanForm = () => {
        document.getElementById("appointment-form").reset();
        setSubmitted(false);
    };

    return (
        <div className='card mt-5' id="contact">
            <h2>Reserva de hora médica</h2>
            <div className="card-body">
                <form id="appointment-form" className="contact-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" id="patient" className="form-control" placeholder="Nombre" value={values.patient} disabled/>
                    </div>
                    <div className="mb-3">
                        <input type="email" id="email" className="form-control" placeholder="Email" value={values.email} disabled/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="specialty" className="form-control" placeholder="Especialidad" onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <textarea rows="4" id="message" className="form-control" placeholder="Mensaje" onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
            <div className="card-body">
                {submitted && !hasError() && (
                    <Modal onClose={() => cleanForm()}>
                        <img className="modal-icon" src="../../images/icon_ok.svg" alt="OK" />
                        <h4>Cita agendada exitosamente</h4>
                    </Modal>
                )}
                 {submitted && hasError() && (
                    <Modal onClose={() => setSubmitted(false)}>
                        <img className="modal-icon" src="../../images/icon_error.svg" alt="Error" />
                        <h4>Error al agendar</h4>
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

export default AppointmentForm;