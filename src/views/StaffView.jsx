import { useState, useEffect } from "react";
import DoctorList from '../components/DoctorList'

const StaffView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);

     useEffect(() => {
        const fetchDoctors = async () => {
            try {
                let response = await fetch("data/doctors.json").then((response) => response.json());
                setDoctors(response);
            } catch(error) {
                setError(error);
            }
        }

        fetchDoctors();
    }, [doctors]);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
        
    return <DoctorList doctors={doctors} />;
};

export default StaffView;