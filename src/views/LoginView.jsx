import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import AppMainLayout from "../layouts/AppMainLayout";

const LoginView = () => {
    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const { login } = useAuth();
    const navigate = useNavigate();

    const processLogin = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "password") {
            login("admin");
            navigate("/");
        } else if (username === "user" && password === "password") {
            login("user");
            navigate("/");
        } else {
            alert("Credenciales incorrectas");
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