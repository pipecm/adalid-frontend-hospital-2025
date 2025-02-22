import React, { useState, useEffect, Profiler } from 'react';
import ServiceList from '../components/ServiceList'
import HospitalInfo from '../components/HospitalInfo';
import AppMainLayout from '../layouts/AppMainLayout';
import { getServices } from '../client/api';
import { useAuth } from '../context/AuthContext';
import TokenError from '../errors/TokenError';

const KEY_HOSPITAL_USER = "hospital_user";

const HomeView = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const { user: authenticatedUser, logout } = useAuth();

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const currentUser = localStorage.getItem(KEY_HOSPITAL_USER);
                let response = await getServices(currentUser, authenticatedUser);
                setServices(response);
            } catch(error) {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                } else {
                    setError(error);
                }
            }
        }

        fetchServices();
    }, []);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
    
    return (
        <AppMainLayout>
            <Profiler id="homeViewProfiler" onRender={onRenderCallback}>
                <React.Fragment>
                    <HospitalInfo />
                    <ServiceList services={services} />
                </React.Fragment>
            </Profiler>
        </AppMainLayout>
    );   
};

export default HomeView;