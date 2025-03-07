import React, { useState } from "react";
import Modal from "./Modal";
import PropTypes from "prop-types";
import withPhoto from "../hoc/withPhoto";
import ShowInfoComponent from "./ShowInfoComponent";

export default function ServiceCard({ service }) {

    const [openDetails, setOpenDetails] = useState(false);
    const openDetailsModal = () => setOpenDetails(true);
    const closeDetailsModal = () => setOpenDetails(false);

    const ServiceComponent = withPhoto(ShowInfoComponent);

    return (
        <React.Fragment key={service.id}>
            <img src={service.imageUrl} className="service__img" alt={service.name} />
            <div className="card-body">
                <h5 className="service__department">{service.name}</h5>
                <button className="btn btn-primary" onClick={openDetailsModal}>Detalles</button>
                {openDetails && (
                    <Modal onClose={closeDetailsModal}>
                        <ServiceComponent {...service} />    
                    </Modal>
                )}
            </div>
        </React.Fragment>
    );
}

ServiceCard.propTypes = {
    service: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
 }