import { useContext } from "react";
import { MenuContext } from "../context/MenuContext";

const Header = () => {
    const KEY_HOME_VIEW = "home";
	const KEY_STAFF_VIEW = "staff";
	const KEY_CONTACT_VIEW = "contact";
    const KEY_APPOINTMENT_VIEW = "appointment";

    const { changeView } = useContext(MenuContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary hospital-menu">
            <div className="container-fluid">
                <a className="navbar-brand" href="#home">⚕️ Hospital San Itario</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="nav-link active" onClick={() => changeView(KEY_HOME_VIEW)}>Inicio</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={() => changeView(KEY_STAFF_VIEW)}>Médicos</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link active" onClick={() => changeView(KEY_CONTACT_VIEW)}>Contacto</button>
                        </li>
                    </ul>
                </div>
            </div>
            <button className="btn btn-primary btn-appt" onClick={() => changeView(KEY_APPOINTMENT_VIEW)}>Reservar cita</button>
        </nav>
    );
};

export default Header;