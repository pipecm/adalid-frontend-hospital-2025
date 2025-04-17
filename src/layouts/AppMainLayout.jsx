import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { getDistanceToHospital } from "../utils/functions";

const AppMainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [distanceToHospital, setDistanceToHospital] = useState(0.0);
    const [locationEnabled, setLocationEnabled] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setLocationEnabled(true);
            setDistanceToHospital(getDistanceToHospital(position.coords.latitude, position.coords.longitude));
        })
    }, []);
    
    return (
        <div className="container">
            <header>
                <nav className="navbar navbar-dark bg-primary hospital-menu">
                    <div className="navbar-upper">
                        <div className="container-login">
                            <a className="hospital-banner navbar-brand" href="#home">⚕️ Hospital San Itario</a>
                        </div>
                        <div>
                            {!user && <button onClick={() => navigate("/patient-signup")} className="btn-menu">Registro</button>}
                            {!user && <button onClick={() => navigate("/login")} className="btn-menu">Login</button>}
                            {user && (user['role'] === "patient") && <button onClick={() => navigate("/appointments")} className="btn-menu">Agendar cita</button>}
                            {user && <button onClick={logout} className="btn-menu">Cerrar Sesión</button>}
                        </div>
                    </div>
                </nav>
                <nav className="navbar-lower">
                    <ul className="navbar-hospital">
                        {user &&
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/"><strong>Inicio</strong></Link>
                            </li>
                        }
                        {user && 
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/staff"><strong>Médicos</strong></Link>
                            </li>
                        }
                        {user && (user['role'] === "doctor") &&
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/doctor"><strong>Perfil</strong></Link>
                            </li>
                        }
                        {user && (user['role'] === "admin") &&
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/dashboard"><strong>Dashboard</strong></Link>
                            </li>
                        }
                    </ul>
                </nav>  
                {user && locationEnabled &&
                    <div className="distance-to-hospital">
                        📍 Usted se encuentra a {distanceToHospital} kilómetros de nuestro Hospital
                    </div> 
                }
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2025 Hospital San Itario. Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default AppMainLayout;