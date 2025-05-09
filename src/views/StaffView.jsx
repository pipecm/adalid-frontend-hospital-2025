import { useState, useEffect, Profiler } from "react";
import DoctorList from '../components/DoctorList'
import AppMainLayout from "../layouts/AppMainLayout";
import { useAuth } from "../context/AuthContext";
import TokenError from "../errors/TokenError";
import { useNavigate } from "react-router-dom";
import useDatabase from "../hooks/useDatabase";

const StaffView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    const { findAll : findAllDoctors } = useDatabase("doctors");

    useEffect(() => {
        findAllDoctors()
            .then(data => setDoctors(data.filter(doctor => doctor.imageUrl)))
            .catch(error => {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                    navigate("/login");
                } else {
                    setError(error);
                }
            });
    }, []);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
        
    return (
        <AppMainLayout>
            <Profiler id="staffViewProfiler" onRender={onRenderCallback}>
                <DoctorList doctors={doctors} />
            </Profiler>
        </AppMainLayout> 
    );
};

export default StaffView;