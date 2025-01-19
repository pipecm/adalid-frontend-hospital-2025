import { useState, useEffect } from 'react';
import ServiceList from '../components/ServiceList'

const HomeView = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

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
    }, [services]);

    if (error) return <h3>{`Error al cargar los datos: ${error}`}</h3>;
    
    return <ServiceList services={services} />;
};

export default HomeView;