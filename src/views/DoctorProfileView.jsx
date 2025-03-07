import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AppMainLayout from '../layouts/AppMainLayout'
import { findDoctorByUsername } from '../client/api';

const KEY_HOSPITAL_USER = "hospital_user";

const DoctorProfileView = () => {
    const [doctor, setDoctor] = useState(undefined);
    const { user: authenticatedUser } = useAuth();
    
    useEffect(() => {
        const retrieveDoctor = async () => {
            const currentUser = localStorage.getItem(KEY_HOSPITAL_USER);
            const doctorFound = await findDoctorByUsername(currentUser, authenticatedUser);
            setDoctor(doctorFound);
        };

        retrieveDoctor();
    }, []);

    if (!doctor) return <h1>Cargando...</h1>

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