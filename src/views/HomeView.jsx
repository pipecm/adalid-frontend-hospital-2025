import React, { useState, useEffect, Profiler } from 'react';
import ServiceList from '../components/ServiceList'
import HospitalInfo from '../components/HospitalInfo';
import AppMainLayout from '../layouts/AppMainLayout';
import { useAuth } from '../context/AuthContext';
import TokenError from '../errors/TokenError';
import { shuffleList } from '../utils/functions';
import { useNavigate } from 'react-router-dom';
import useRestApi from '../hooks/useRestApi';

const HomeView = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [reloaded, setReloaded] = useState(false);
    const { user: authenticatedUser, logout } = useAuth();
    const navigate = useNavigate();

    const { findData: findAllServices } = useRestApi("/services", authenticatedUser);

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    const reload = () => {
        setError(null);
        setReloaded(!reloaded);
    }

    useEffect(() => {
        findAllServices()
            .then(services => setServices(shuffleList(services)))
            .catch(error => {
                if (error instanceof TokenError) {
                    alert(error.message);
                    logout();
                    navigate("/login");
                } else {
                    setError(error);
                }
            });
    }, [reloaded]);

    if (error) {
        return (
            <div>
                <h3>{`Error al cargar los datos: ${error.message}`}</h3>
                <button className="btn btn-primary" onClick={reload}>Intentar nuevamente</button>
            </div>
        );
    } 

    if (!services) return <h3>Cargando...</h3>;
    
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