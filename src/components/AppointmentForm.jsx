import { useState } from "react";
import Modal from "./Modal";
import { createAppointment } from "../client/api";
import { sanitizeAndEncrypt } from "../utils/functions";
import TokenError from '../errors/TokenError';
import { useAuth } from "../context/AuthContext";

const KEY_HOSPITAL_USER = "hospital_user";

const AppointmentForm = () => {
    const [patient, setPatient] = useState(null);
    const [email, setEmail] = useState(null);
    const [specialty, setSpecialty] = useState(null);
    const [message, setMessage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const { user: authenticatedUser, logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUser = localStorage.getItem(KEY_HOSPITAL_USER);

        let data = { 
            patient: sanitizeAndEncrypt(patient), 
            email: sanitizeAndEncrypt(email), 
            specialty: sanitizeAndEncrypt(specialty), 
            message: sanitizeAndEncrypt(message)
        };

        if (isValid(data)) {
            try {
                const response = await createAppointment(currentUser, authenticatedUser, data);
                console.log(`Response: ${response}`);
                setSubmitted(true);
            } catch (error) {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                } else {
                    setHasError(true);
                }
            }
        } else {
            setHasError(true);
        }
    }

    const isValid = (data) => {
        for (let key in data) {
            if (!data[key]) {
                return false;
            }
        }
        return true;
    }

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
                        <input type="text" id="patient" className="form-control" placeholder="Nombre" onChange={e => setPatient(e.target.value)} autoFocus />
                    </div>
                    <div className="mb-3">
                        <input type="email" id="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="specialty" className="form-control" placeholder="Especialidad" onChange={e => setSpecialty(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <textarea rows="4" id="message" className="form-control" placeholder="Mensaje" onChange={e => setMessage(e.target.value)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Enviar</button>
                </form>
            </div>
            <div className="card-body">
                {submitted && (
                    <Modal onClose={() => cleanForm()}>
                        <img className="modal-icon" src="../../images/icon_ok.svg" alt="OK" />
                        <h4>Cita agendada exitosamente</h4>
                    </Modal>
                )}
                 {hasError && (
                    <Modal onClose={() => setHasError(false)}>
                        <img className="modal-icon" src="../../images/icon_error.svg" alt="Error" />
                        <h4>Error al agendar</h4>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default AppointmentForm;