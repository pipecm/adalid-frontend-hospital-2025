import { useEffect, useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import useCrud from "../hooks/useCrud";
import { useAuth } from "../context/AuthContext";
import DoctorForm from "../components/DoctorForm";
import CrudModal from "../components/CrudModal";

const DashboardView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(undefined);
    const [openDetails, setOpenDetails] = useState(false);
    const [modalData, setModalData] = useState({});

    const { user: authenticatedUser } = useAuth();
    const { createData: createDoctor, findData: getDoctors, updateData: updateDoctor, deleteData: deleteDoctor } = useCrud("/doctors", authenticatedUser);

    const getOperationFunction = (operation) => {
        let operationFunction;
        switch(operation) {
            case 1:
                operationFunction = createDoctor;
                break;
            case 2:
                operationFunction = updateDoctor;
                break;
            case 3:
                operationFunction = deleteDoctor;
                break;
            default:
                throw new Error("Operación no válida");
        }
        return operationFunction;
    }

    const openDetailsModal = (operation, doctor) => {
        setModalData({ 
            operation: operation, 
            doctor: doctor, 
            onSubmit: getOperationFunction(operation),
            onClose: closeDetailsModal
        });
        setOpenDetails(true);
    }

    const closeDetailsModal = () => {
        setModalData({});
        setOpenDetails(false);
    }

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsFound = await getDoctors();
                setDoctors(doctorsFound);
            } catch (err) {
                setError(err);
            }
        };

        fetchDoctors();
    }, [doctors]);

    if (error) return <h3>{error}</h3>;

    return (
        <AppMainLayout>
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title d-flex bd-highlight">
                        <div className="row p-2 flex-grow-1 bd-highlight"><h2>Doctores</h2></div>
                        <button className="btn btn-primary" onClick={() => openDetailsModal(1, undefined)}>Nuevo doctor</button>
                    </div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Especialidad</th>
                                <th>Años de experiencia</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map(doctor => (
                                <tr key={doctor.id}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.specialty}</td>
                                    <td>{doctor.yearsOfExperience}</td>
                                    <td>
                                        <a href="#" onClick={() => openDetailsModal(2, doctor)} className="edit" title="Editar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                        <a href="#" onClick={() => openDetailsModal(3, doctor)} className="delete" title="Borrar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openDetails && 
                <CrudModal onClose={closeDetailsModal}>
                    <DoctorForm {...modalData}/>
                </CrudModal>
            }  
        </AppMainLayout>
    );
};

export default DashboardView;
