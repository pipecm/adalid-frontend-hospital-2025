import { useEffect, useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import DoctorForm from "../components/DoctorForm";
import CrudModal from "../components/CrudModal";
import useDatabase from "../hooks/useDatabase";

const DashboardView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(undefined);
    const [openDetails, setOpenDetails] = useState(false);
    const [modalData, setModalData] = useState({});

    const { insert: createDoctor, findAll: findAllDoctors, update: updateDoctor, remove: deleteDoctor } = useDatabase("doctors");

    const getOperationFunction = (operation) => {
        let operationFunction;
        switch(operation) {
            case 1:
                operationFunction = (doctor) => {
                    createDoctor(doctor)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
                break;
            case 2:
                operationFunction = (doctor) => {
                    updateDoctor(doctor)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
                break;
            case 3:
                operationFunction = (doctorId) => {
                    deleteDoctor(doctorId)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
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
        findAllDoctors()
            .then(data =>  setDoctors(data))
            .catch(error => setError(error));
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
