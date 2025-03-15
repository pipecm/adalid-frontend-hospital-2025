import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";
import { sanitizeAndEncrypt } from "../utils/functions";

const LoginView = () => {
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const { login } = useAuth();
    const navigate = useNavigate();

    const processLogin = async (event) => {
        try {
            event.preventDefault();
            const encodedEmail = sanitizeAndEncrypt(email);
            const encodedPassword = sanitizeAndEncrypt(password);

            const userFound = await login(encodedEmail, encodedPassword);
            if (userFound) {
                switch (userFound.role) {
                    case "patient":
                    case "admin":
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
                        <input type="email" className="form-control form-element" id="email" placeholder="Email" 
                                value={email} onChange={(e) => setEmail(e.target.value)}/>
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