import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppMainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container">
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary hospital-menu">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#home">⚕️ Hospital San Itario</a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                {user && 
                                    <li className="nav-item nav-link">
                                        <Link to="/">
                                            <span className="nav-text">Inicio</span>
                                        </Link>
                                    </li>
                                }
                                {user && 
                                    <li className="nav-item nav-link">
                                        <Link to="/staff">
                                            <span className="nav-text">Médicos</span>
                                        </Link>
                                    </li>
                                }
                                {user && (user['role'] === "doctor") &&
                                    <li className="nav-item nav-link">
                                        <Link to="/doctor">
                                            <span className="nav-text">Perfil</span>
                                        </Link>
                                    </li>
                                }
                            </ul>
                        </div>
                    </div>
                    {!user && <button onClick={() => navigate("/patient-signup")} className="btn btn-primary btn-menu">Registro</button>}
                    {!user && <button onClick={() => navigate("/login")} className="btn btn-primary btn-menu">Login</button>}
                    {user && (user['role'] === "patient") && <button onClick={() => navigate("/appointments")} className="btn btn-primary btn-menu">Agendar cita</button>}
                    {user && <button onClick={logout} className="btn btn-primary btn-menu">Cerrar Sesión</button>}
                </nav>
            </header>
            <main>{children}</main>
            <footer>
                <p>&copy; 2025 Hospital San Itario. Todos los derechos reservados</p>
            </footer>
        </div>
    );
}

export default AppMainLayout;