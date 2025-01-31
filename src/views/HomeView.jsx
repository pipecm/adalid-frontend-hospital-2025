import React, { useState, useEffect, Profiler } from 'react';
import ServiceList from '../components/ServiceList'
import HospitalInfo from '../components/HospitalInfo';
import { findAllServices } from '../client/ApiClient';

const HomeView = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [reloaded, setReloaded] = useState(false);

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    const reload = () => {
        setError(null);
        setReloaded(!reloaded);
    }

    const shuffle = (list) => { 
        return list.map((a) => ({ sort: Math.random(), value: a }))
            .sort((a, b) => a.sort - b.sort)
            .map((a) => a.value); 
    }; 

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let response = await findAllServices();
                setServices(shuffle(response));
            } catch(error) {
                setError(error);
            }
        }

        fetchServices();
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
        <Profiler id="homeViewProfiler" onRender={onRenderCallback}>
            <React.Fragment>
                <HospitalInfo />
                <ServiceList services={services} />
                <button className="btn btn-primary" onClick={reload}>Recargar vista</button>
            </React.Fragment>
        </Profiler>
    );   
};

export default HomeView;