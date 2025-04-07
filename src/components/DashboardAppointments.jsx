import { useState, useEffect } from "react";
import useDatabase from "../hooks/useDatabase";

const DashboardAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(undefined);
    const { findAll: findAllAppointments } = useDatabase("appointments");

    useEffect(() => {
        findAllAppointments()
            .then(data =>  setAppointments(data))
            .catch(error => setError(error));
    }, []);

    if (error) return <h3>{error}</h3>;

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title d-flex bd-highlight">
                    <div className="row p-2 flex-grow-1 bd-highlight"><h2>Citas agendadas</h2></div>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Paciente</th>
                            <th>Especialidad</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map(appointment => (
                            <tr key={appointment.id}>
                                <td>{appointment.patient}</td>
                                <td>{appointment.specialty}</td>
                                <td>{appointment.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardAppointments;