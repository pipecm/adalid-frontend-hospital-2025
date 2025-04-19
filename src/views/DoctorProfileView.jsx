import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppMainLayout from '../layouts/AppMainLayout'
import useRestApi from '../hooks/useRestApi';

const DoctorProfileView = () => {
    const [doctor, setDoctor] = useState(undefined);
    const [error, setError] = useState(undefined);
    const { user: authenticatedUser } = useAuth();
    const { findData: findAllDoctors } = useRestApi("/doctors", authenticatedUser);
    
    useEffect(() => {
        findAllDoctors()
            .then(data => setDoctor(data.find(dr => dr.email === authenticatedUser.email)))
            .catch(error => setError(error));
    }, []);

    if (!doctor) return <h1>Cargando...</h1>
    if (error) return <h1>{`Error al cargar los datos: ${error.message}`}</h1>

    return (
        <AppMainLayout>
            <h1>{doctor.name}</h1>
            <h4>{doctor.specialty}</h4>
            <img src={doctor.imageUrl} alt={doctor.name} className="img-profile-doctor"/>
            <p>{doctor.experience}</p>
        </AppMainLayout>
    );
};

export default DoctorProfileView;