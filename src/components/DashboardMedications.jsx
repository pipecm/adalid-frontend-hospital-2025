import { useEffect, useState } from "react";
import MedicationForm from "../components/MedicationForm";
import { useAuth } from "../context/AuthContext";
import useRestApi from "../hooks/useRestApi";
import CrudModal from "./CrudModal";

const DashboardMedications = () => {
    const [medications, setMedications] = useState([]);
    const [error, setError] = useState(undefined);
    const [openDetails, setOpenDetails] = useState(false);
    const [modalData, setModalData] = useState({});

    const { user: authenticatedUser } = useAuth();
    const { createData: createMedication, findData: findAllMedications,
        updateData: updateMedication, deleteData: deleteMedication } = useRestApi("/medications", authenticatedUser);

    const getOperationFunction = (operation) => {
        let operationFunction;
        switch(operation) {
            case 1:
                operationFunction = (medication) => {
                    createMedication(medication)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
                break;
            case 2:
                operationFunction = (medication) => {
                    updateMedication(medication)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
                break;
            case 3:
                operationFunction = (medicationId) => {
                    deleteMedication(medicationId)
                        .then(msg => console.log(msg))
                        .catch(error => setError(error));
                };
                break;
            default:
                throw new Error("Operación no válida");
        }
        return operationFunction;
    }

    const openDetailsModal = (operation, medication) => {
        setModalData({ 
            operation: operation, 
            medication: medication, 
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
        findAllMedications()
            .then(data =>  setMedications(data))
            .catch(error => setError(error));
    }, [medications]);

    if (error) return <h3>{error}</h3>;

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title d-flex bd-highlight">
                    <div className="row p-2 flex-grow-1 bd-highlight"><h2>Inventario de medicamentos</h2></div>
                    <button className="btn btn-primary" onClick={() => openDetailsModal(1, undefined)}>Nuevo medicamento</button>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Presentación</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medications.map(medication => (
                            <tr key={medication.id}>
                                <td>{medication.name}</td>
                                <td>{medication.presentation}</td>
                                <td>{medication.stock}</td>
                                <td>
                                    <a href="#" onClick={() => openDetailsModal(2, medication)} className="edit" title="Editar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                    <a href="#" onClick={() => openDetailsModal(3, medication)} className="delete" title="Borrar" data-toggle="tooltip"><i className="material-icons"></i></a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openDetails && 
                <CrudModal onClose={closeDetailsModal}>
                    <MedicationForm {...modalData}/>
                </CrudModal>
            }  
        </div>
    );
};

export default DashboardMedications;