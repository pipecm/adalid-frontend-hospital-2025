import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import { sanitizeAndEncrypt } from "../utils/functions";

const LoginView = () => {
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const { login } = useAuth();
    const navigate = useNavigate();

    const processLogin = async (event) => {
        try {
            event.preventDefault();
            const encodedUsername = sanitizeAndEncrypt(username);
            const encodedPassword = sanitizeAndEncrypt(password);

            const userFound = await login(encodedUsername, encodedPassword);
            if (userFound) {
                switch (userFound.role) {
                    case "user":
                        navigate("/");
                        break;
                    case "doctor":
                        navigate("/doctor");
                        break;
                    default:
                        alert("Rol no válido");
                        navigate("/login");
                        break;
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AppMainLayout>
            <h1>Login</h1>
            <div className="form-container">
                <div className="card card-form">
                    <form onSubmit={processLogin}>
                        <input type="text" className="form-control form-element" id="username" placeholder="Usuario" 
                                value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <br />
                        <input type="password" className="form-control form-element" id="password" placeholder="Clave" 
                                value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <br />
                        <button type="submit" className="btn btn-primary">Iniciar sesión</button>
                    </form>
                </div>
            </div>
        </AppMainLayout>
      );

};

export default LoginView;