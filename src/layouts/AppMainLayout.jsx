import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AppMainLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

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
                                <Link className="nav-text" to="/">Inicio</Link>
                            </li>
                        }
                        {user && 
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/staff">Médicos</Link>
                            </li>
                        }
                        {user && (user['role'] === "doctor") &&
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/doctor">Perfil</Link>
                            </li>
                        }
                        {user && (user['role'] === "admin") &&
                            <li className="nav-item nav-link">
                                <Link className="nav-text" to="/dashboard">Dashboard</Link>
                            </li>
                        }
                    </ul>
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