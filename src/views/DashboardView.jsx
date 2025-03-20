import { useEffect, useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import useCrud from "../hooks/useCrud";
import { useAuth } from "../context/AuthContext";
import { decryptInput } from "../utils/encryption";

const ROLE_PATIENT = "patient";

const DashboardView = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(undefined);

    const { user: authenticatedUser } = useAuth();
    const { findData: getPatients } = useCrud("/users", authenticatedUser);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const patientsFound = await getPatients(user => decryptInput(user.role) === ROLE_PATIENT);
                setPatients(patientsFound);
            } catch (err) {
                setError(err);
            }
        };

        fetchPatients();
    }, []);

    const openModal = () => {
        alert("Pronto...");
    };

    if (error) return <h3>{error}</h3>;

    return (
        <AppMainLayout>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row"><h2>Pacientes</h2></div>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map(patient => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.email}</td>
                                    <td>tel</td>
                                    <td>
                                        <a href="#" onClick={openModal} className="edit" title="Editar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                        <a href="#" onClick={openModal} className="delete" title="Borrar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>    
        </AppMainLayout>
    );
};

export default DashboardView;
