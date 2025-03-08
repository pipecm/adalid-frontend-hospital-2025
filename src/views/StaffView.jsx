import { useState, useEffect, Profiler } from "react";
import DoctorList from '../components/DoctorList'
import AppMainLayout from "../layouts/AppMainLayout";
import { getDoctors } from "../client/api";
import { useAuth } from "../context/AuthContext";
import TokenError from "../errors/TokenError";

const KEY_HOSPITAL_USER = "hospital_user";

const StaffView = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState(null);
    const { user: authenticatedUser, logout } = useAuth();

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const currentUser = localStorage.getItem(KEY_HOSPITAL_USER);
                let response = await getDoctors(currentUser, authenticatedUser);
                setDoctors(response);
            } catch (error) {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                } else {
                    setError(error);
                }
            }
        }

        fetchDoctors();
    }, []);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
        
    return (
        <AppMainLayout>
            <Profiler id="staffViewProfiler" onRender={onRenderCallback}>
                <DoctorList doctors={doctors} />;
            </Profiler>
        </AppMainLayout> 
    );
};

export default StaffView;