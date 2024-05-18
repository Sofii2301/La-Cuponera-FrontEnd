import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";

//assets
import google from "../assets/icon-google.png"
import face from "../assets/icon-face.png"

export default function RegistroCuponero(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        contraseña: "",
        registroFecha: "", 
        estadoVerificacion: "",
        type:'cuponero'
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }

        try {
            const response = await fetch('https://lacuponera-cuponeros.vercel.app/api/cuponeros/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                const cuponeroId = data.id; // ID generado por la base de datos
                const registroCuponeroValue = true;

                // Guardar el ID del cuponero y los datos del cuponero en localStorage
                localStorage.setItem("cuponeroData", JSON.stringify({ id: cuponeroId, ...formData, cupones: [], registroCuponero: registroCuponeroValue }));
                
                const cuponeroData = JSON.parse(localStorage.getItem("cuponeroData"));
                console.log("RegistroCuponero: ", cuponeroData.registroCuponero);
                const userType = 'cuponero';
                navigate(`/signup/verify/${userType}/${formData.email}`); // Navega a la página verificacion del correo
            } else {
                setErrorMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error interno del servidor');
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (formData.nombre.trim() === '') {
            setErrorMessage('Por favor, ingresa tu nombre');
            isValid = false;
        }

        if (formData.apellido.trim() === '') {
            setErrorMessage('Por favor, ingresa tu apellido');
            isValid = false;
        }

        if (formData.email.trim() === '') {
            setErrorMessage('Por favor, ingresa tu correo electrónico');
            isValid = false;
        }

        if (formData.contraseña.trim() === '') {
            setErrorMessage('Por favor, ingresa tu contraseña');
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return(
        <>
        
        <ContainerMap title="Empezá a conseguir cupones" subtitle="¡Bienvenido a La Cuponera! Ingresá tu correo electrónico para comenzar" isSignIn="sesion" imagen="r-cuponero">
            <form className="needs-validation">
                <div className="mb-3 fila-rc">
                    <div className="col-rc">
                        <label htmlFor="formSignupfname" className="form-label visually-hidden">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className={`form-control ${formErrors.firstName && 'is-invalid'}`} id="formSignupfname" placeholder="Nombre" required />
                        <div className="invalid-feedback">{formErrors.firstName}</div>
                    </div>
                    <div className="col-rc">
                        <label htmlFor="formSignuplname" className="form-label visually-hidden">Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className={`form-control ${formErrors.lastName && 'is-invalid'}`} id="formSignuplname" placeholder="Apellido" required />
                        <div className="invalid-feedback">{formErrors.lastName}</div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="formSignupEmail" className="form-label visually-hidden">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={`form-control ${formErrors.email && 'is-invalid'}`} id="formSignupEmail" placeholder="Correo electrónico" required />
                    <div className="invalid-feedback">{formErrors.email}</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="formSignupPassword" className="form-label visually-hidden">Contraseña</label>
                    <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} className={`form-control ${formErrors.password && 'is-invalid'}`} id="formSignupPassword" placeholder="Contraseña" required />
                    {/* colocar un ojo para ver la contraseña */}
                    <div className="invalid-feedback">{formErrors.password}</div>
                </div>
                {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                <div className="mb-3">
                    <button type="submit" onClick={handleRegister} style={{ width: "100%" }} className="btn btn-amarillo">Registrar</button>
                </div>
                <div className="registro-con">
                    <div className="col-12 d-grid mb-2">
                        <GoogleLoginButton />
                    </div>
                    <div className="col-12 d-grid">
                        <FacebookLoginButton />
                    </div>
                </div>
            </form>
        </ContainerMap>
        </>
    );    
}
