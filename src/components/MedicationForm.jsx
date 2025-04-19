import useForm from "../hooks/useForm";
import { validateEmptyFields } from "../utils/functions";
import { v4 as uuidv4 } from 'uuid';

const MedicationForm = ({ operation, medication, onSubmit, onClose }) => {

    let medicationValues = {
        id: medication ? medication.id : uuidv4(),
        name: medication ? medication.name : "",
        presentation: medication ? medication.presentation : "",
        stock: medication ? medication.stock : ""
    };
   
    let title;
    switch(operation) {
        case 1:
            title = "Nuevo medicamento";
            break;
        case 2:
            title = "Editar medicamento";
            break;
        case 3:
            title = "Borrar medicamento";
            break;
        default:
            throw new Error("Operación no válida");
    }

    const validate = (values) => {
        const validationErrors = validateEmptyFields(values);
        return validationErrors;
    };

    const deleteMedication = () => {
        onSubmit(medicationValues.id);
        onClose();
    };

    const { handleSubmit, handleChange } = useForm(medicationValues, validate, onSubmit, onClose, false);

    return (
        <div>
            <h3>{title}</h3>
            {(operation === 1 || operation === 2) &&
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="mb-3">
                        <input type="text" id="name" className="form-control" placeholder="Nombre" 
                            defaultValue={medicationValues.name} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="presentation" className="form-control" placeholder="Presentación" 
                            defaultValue={medicationValues.presentation} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <input type="text" id="stock" className="form-control" placeholder="Stock" 
                            defaultValue={medicationValues.stock} onChange={handleChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary">{operation === 1 ? "Crear" : "Actualizar"}</button>
                    <button onClick={onClose} className="btn btn-primary">Cancelar</button>
                </form>
            }
            {operation === 3 &&
                <div>
                    <h6>El medicamento {medicationValues.name} será borrado del sistema. ¿Está seguro?</h6>
                    <br />
                    <button onClick={deleteMedication} className="btn btn-primary">Borrar</button>
                    <button onClick={onClose} className="btn btn-primary">Cancelar</button>
                </div>     
            }   
        </div>
    );
};

export default MedicationForm;