import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { useAuth } from '../context/AuthContext';
import { checkIfUserIsLogged } from "../utils/controlSession";

export default function SignIn() {
    /*checkIfUserIsLogged();*/

    const [credentialsVendedor, setCredentialsVendedor] = useState({
        email: '',
        contraseña: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentialsVendedor(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formatData = {
                user_email: credentialsVendedor.email,
                user_pass: credentialsVendedor.contraseña,
            };
            await login(formatData, 'vendedor');
            navigate(`/vendedor/perfil/vista-previa`);
            //navigate(`/thank-you/${userType}`);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return(
        <>
        <ContainerMap title="Ingresá a Cuponera" subtitle="¡Bienvenido de nuevo a Cuponera! Ingresá tu correo electrónico para comenzar" isSignIn="registro-v" >
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row fila-sg g-3">
                    <div className="col-12">
                        <label htmlFor="formSigninEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" name="email" value={credentialsVendedor.email} onChange={handleChange} className="form-control" id="formSigninEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12">
                        <div className="password-field position-relative">
                            <label htmlFor="formSigninPassword" className="form-label visually-hidden">Contraseña</label>
                            <div className="password-field position-relative">
                                <input type={showPassword ? "text" : "password"} name={"contraseña"} value={credentialsVendedor.contraseña} onChange={handleChange}  className="form-control fakePassword" id="formSigninPassword" placeholder="********" required />
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="form-check mt-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="showPasswordCheck"
                                            checked={showPassword}
                                            onChange={() => setShowPassword(!showPassword)}
                                        />
                                        <label className="form-check-label" htmlFor="showPasswordCheck">
                                            Mostrar contraseña
                                        </label>
                                    </div>
                                    <div className="invalid-feedback">Por favor, ingresá tu contraseña</div>
                                    <Link style={{ color:"#0088ff"}} to="/forgot-password/vendedor">¿Olvidaste tu contraseña?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 d-grid mb-3">
                        <button type="submit" id="sesion" className="btn btn-amarillo">Iniciar Sesión</button>
                    </div>
                    <div className="border-top"></div>
                    <div className="d-flex flex-column align-items-center justify-content-center mt-4 mb-2">
                        ¿Aún no tienes una cuenta? 
                        <Link to="/signup/vendedor" className="btn btn-azul mt-3 w-100" style={{ color: '#fff'}}>Registrarse</Link>
                    </div>
                </div>
            </form>
        </ContainerMap>
    </> 
    )
}
