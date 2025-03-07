import { PropTypes } from "prop-types";
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services }) {

    return (
        <div id="services">
            <h2>Servicios</h2>
            <ul className="services-list">
                {services.map(service => (
                    <li key={parseInt(service.id)}>
                      <ServiceCard service={service}/>
                    </li>
                ))}
            </ul>
            
        </div>
    );
};

ServiceList.propTypes = {
    services: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })).isRequired
}