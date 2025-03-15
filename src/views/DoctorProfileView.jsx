import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppMainLayout from '../layouts/AppMainLayout'
import { findDoctorByEmail } from '../client/api';
import TokenError from '../errors/TokenError';
import { getStoredUser } from '../utils/functions';

const DoctorProfileView = () => {
    const [doctor, setDoctor] = useState(undefined);
    const [error, setError] = useState(undefined);
    const { user: authenticatedUser, logout } = useAuth();
    
    useEffect(() => {
        const retrieveDoctor = async () => {
            try {
                const currentUser = getStoredUser();
                const doctorFound = await findDoctorByEmail(currentUser, authenticatedUser);
                setDoctor(doctorFound);
            } catch (error) {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                } else {
                    setError(error);
                }
            }
        };

        retrieveDoctor();
    }, []);

    if (!doctor) return <h1>Cargando...</h1>
    if (error) return <h1>{`Error al cargar los datos: ${error.message}`}</h1>

    return (
        <AppMainLayout>
            <h1>{doctor.name}</h1>
            <h4>{doctor.specialty}</h4>
            <img src={doctor.imageUrl} alt={doctor.name}/>
            <p>{doctor.experience}</p>
        </AppMainLayout>
    );
};

export default DoctorProfileView;