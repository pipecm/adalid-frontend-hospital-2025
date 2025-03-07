import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "./Modal";
import withPhoto from "../hoc/withPhoto";
import ShowInfoComponent from "./ShowInfoComponent";

export default function DoctorCard({ doctor }) {

    const [openDetails, setOpenDetails] = useState(false);
    const openDetailsModal = () => setOpenDetails(true);
    const closeDetailsModal = () => setOpenDetails(false);

    const DoctorComponent = withPhoto(ShowInfoComponent);

    return (
        <React.Fragment key={doctor.id}>
            <img src={doctor.imageUrl} className="service__img" alt={doctor.name} />
            <div className="card-body">
                <h5 className="service__department">{doctor.name}</h5>
                <button className="btn btn-primary" onClick={openDetailsModal}>Detalles</button>
                
                {openDetails && (
                    <Modal onClose={closeDetailsModal}>
                        <DoctorComponent {...doctor} description={doctor.experience}/>
                    </Modal>
                )}
            </div>
        </React.Fragment>
    );
};

DoctorCard.propTypes = {
    doctor: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        specialty: PropTypes.string.isRequired,
        experience: PropTypes.string.isRequired
    })
};