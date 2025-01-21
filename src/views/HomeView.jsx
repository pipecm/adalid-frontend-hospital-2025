import React, { useState, useEffect, Profiler } from 'react';
import ServiceList from '../components/ServiceList'
import HospitalInfo from '../components/HospitalInfo';

const HomeView = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    const onRenderCallback = (id, phase, actualDuration) => {
		console.log(`${id} (${phase}) tomó ${actualDuration} ms para renderizar`);
	};

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let response = await fetch("data/services.json").then((response) => response.json());
                setServices(response);
            } catch(error) {
                setError(error);
            }
        }

        fetchServices();
    }, []);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
    
    return (
        <Profiler id="homeViewProfiler" onRender={onRenderCallback}>
            <React.Fragment>
                <HospitalInfo />
                <ServiceList services={services} />
            </React.Fragment>
        </Profiler>
    );   
};

export default HomeView;