import { useState } from "react";
import Modal from "./Modal";

const AppointmentForm = () => {
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [specialty, setSpecialty] = useState(null);
    const [message, setMessage] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = { name, email, specialty, message };
        if (isValid(data)) {
            setSubmitted(true);
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

    return (
        <div className='card mt-5' id="contact">
            <h2>Reserva de hora médica</h2>
            <div className="card-body">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" id="name" className="form-control" placeholder="Nombre" onChange={e => setName(e.target.value)} autoFocus />
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
                    <Modal onClose={() => setSubmitted(false)}>
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