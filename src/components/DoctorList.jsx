import PropTypes from "prop-types";
import DoctorCard from "./DoctorCard";

export default function DoctorList({ doctors }) {

    return (
        <div id="#staff">
            <h2>Equipo médico</h2>
            <ul className="services-list">
                {doctors
                    .filter(doctor => doctor.id)
                    .map(doctor => (
                        <li key={doctor.id}>
                            <DoctorCard doctor={doctor} />
                        </li>
                ))}
            </ul>
        </div>
    );
}

DoctorList.propTypes = {
    doctors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired
    })).isRequired
};