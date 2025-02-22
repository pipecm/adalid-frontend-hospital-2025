import PropTypes from "prop-types";
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors }) {

    return (
        <div id="#staff">
            <h2>Equipo médico</h2>
            <ul className="services-list">
                {doctors.map(doctor => (
                    <li key={parseInt(doctor.id)}>
                        <DoctorCard doctor={doctor} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

DoctorList.propTypes = {
    doctors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired
    })).isRequired
};