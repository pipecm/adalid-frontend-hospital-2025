import { useState, useEffect, Profiler } from "react";
import DoctorList from '../components/DoctorList'
import { findAllDoctors } from "../client/ApiClient";

const StaffView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

     useEffect(() => {
        const fetchDoctors = async () => {
            try {
                let response = await findAllDoctors();
                setDoctors(response);
            } catch(error) {
                setError(error);
            }
        }

        fetchDoctors();
    }, []);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
        
    return (
        <Profiler id="staffViewProfiler" onRender={onRenderCallback}>
            <DoctorList doctors={doctors} />;
        </Profiler>
    );
};

export default StaffView;