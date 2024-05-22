import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap";
import { loginCuponero } from '../services/cuponerosService';
import { loginVendedor } from "../services/vendedoresService";

export default function SignIn(props) {
    const [credentialsVendedor, setCredentialsVendedor] = useState({
        email: '',
        contraseña: ''
    });
    const [credentialsCuponero, setCredentialsCuponero] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [userType, setUserType] = useState(""); // Estado para almacenar el tipo de usuario seleccionado
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (userType==="vendedor") {
            setCredentialsVendedor(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        if (userType==="cuponero") {
            setCredentialsCuponero(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si se ha seleccionado un tipo de usuario
        if (!userType) {
            setErrorMessage("Debes elegir un tipo de usuario");
            return; // Detener la ejecución de la función
        }

        try {
            if (userType==="vendedor") {
                await loginVendedor(credentialsVendedor);
            } else {
                if (userType==="cuponero") {
                    console.log(credentialsCuponero);
                    await loginCuponero(credentialsCuponero);
                } else {
                    return;
                }
            }
            
            navigate(`/thank-you/${userType}`);

            // Recuperar los datos del localStorage según el tipo de usuario seleccionado
            //const userData = JSON.parse(localStorage.getItem(`${userType}Data`));
            //console.log(userData);

            // Verificar si hay datos en el localStorage
            /*if (!userData) {
                setErrorMessage("No se encontraron datos de usuario");
                return
            } else {
                // Verificar si los datos ingresados coinciden con los almacenados
                if (userData.email === email && userData.contraseña === contraseña) {
                    navigate(`/${userType}`);
                    //navigate(`/thank-you/${userType}`);
                } else {
                    setErrorMessage("Email o contraseña incorrectos");
                }
                return;
            }*/

        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    /*const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Verificar si se ha seleccionado un tipo de usuario
        if (!userType) {
            setErrorMessage("Debes elegir un tipo de usuario");
            return; // Detener la ejecución de la función
        }

        // Recuperar los datos del localStorage según el tipo de usuario seleccionado
        const userData = JSON.parse(localStorage.getItem(`${userType}Data`));
        console.log(userData);
        
        // Verificar si hay datos en el localStorage
        if (!userData) {
            setErrorMessage("No se encontraron datos de usuario");
            return;
        }

        // Verificar si los datos ingresados coinciden con los almacenados
        if (userData.email === email && userData.contraseña === contraseña) {
            navigate(`/${userType}`);
            //navigate(`/thank-you/${userType}`);
        } else {
            setErrorMessage("Email o contraseña incorrectos");
        }
    };*/

    // Funciones para manejar los clics en los botones de tipo de usuario
    const handleVendedorClick = () => {
        setUserType('vendedor');
        setErrorMessage("");
    };

    const handleCuponeroClick = () => {
        setUserType('cuponero');
        setErrorMessage("");
    };

    return(
        <>
        <ContainerMap title="Ingresá a Cuponera" subtitle="¡Bienvenido de nuevo a Cuponera! Ingresá tu correo electrónico para comenzar" isSignIn="registro" >
            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
            <div className="row fila-sg g-3 align-items-center justify-content-center">
                <div className="col-12">
                    Ingresar como:
                </div>
                <div className="col-6 btn-microservicios">
                    <button onClick={handleVendedorClick} className={ userType === 'vendedor' ? 'selected' : ''}>
                        Vendedor
                    </button>
                </div>
                <div className="col-6 btn-microservicios">
                    <button onClick={handleCuponeroClick} className={userType === 'cuponero' ? 'selected' : ''}>
                        Cuponero
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="needs-validation">
                <div className="row fila-sg g-3">
                    <div className="col-12">
                        <label htmlFor="formSigninEmail" className="form-label visually-hidden">Email</label>
                        <input type="email" name="email" value={userType==="vendedor"? credentialsVendedor.email : credentialsCuponero.email} onChange={handleChange} className="form-control" id="formSigninEmail" placeholder="Email" required />
                        <div className="invalid-feedback">Por favor, ingresá tu mail</div>
                    </div>
                    <div className="col-12">
                        <div className="password-field position-relative">
                            <label htmlFor="formSigninPassword" className="form-label visually-hidden">Contraseña</label>
                            <div className="password-field position-relative">
                                <input type={showPassword ? "text" : "password"} name={userType==="vendedor"? "contraseña" : "password"} value={userType==="vendedor"? credentialsVendedor.contraseña : credentialsCuponero.password} onChange={handleChange}  className="form-control fakePassword" id="formSigninPassword" placeholder="********" required />
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
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between flex-wrap">
                        {/*<div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                            <label className="form-check-label" htmlFor="flexCheckDefault">Recordarme</label>
                        </div>*/}
                        <div>
                            <Link style={{ color:"#0088ff"}} to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                        </div>
                    </div>
                    <div className="col-12 d-grid">
                        <button type="submit" id="sesion" className="btn btn-amarillo">Iniciar Sesión</button>
                    </div>
                <div>¿Aún no tenés una cuenta? <Link to="/" style={{ color: '#0088ff'}}>Registrarse</Link></div>
                </div>
            </form>
        </ContainerMap>
        </>
    )
}
