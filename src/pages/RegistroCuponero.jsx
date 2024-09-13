import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContainerMap from "../components/ContainerMap"
import GoogleLoginButton from "../components/GoogleLoginButton";
import FacebookLoginButton from "../components/FacebookLoginButton";
import { useAuth } from '../services/AuthContext';
import { useCart } from "../services/CartContext";

/*  id: {type: Number, required: false},
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    registroFecha: {type: String, required: false },
    estadoVerificacion: { type: String, required: false, enum: ['Pendiente', 'Aprobada', 'Desaprobada'] }, 
*/

export default function RegistroCuponero(props) {
    const navigate = useNavigate();
    const { register } = useAuth();
    const { emptyCart } = useCart(); 
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        registroFecha: new Date().toISOString(), // Fecha actual
        estadoVerificacion: "Pendiente", // Estado inicial
    });
    const [formErrors, setFormErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        
        try {
            const userType = 'cuponero';
            await register(formData, userType);
            emptyCart();
            navigate(`/signup/verify/`);
        } catch (err) {
            console.error('Error:', err);
            setErrorMessage(err.message);
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

        if (formData.password.trim() === '') {
            setErrorMessage('Por favor, ingresa tu contraseña');
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return(
        <>
        
        <ContainerMap title="¡Registrate y comenzá a ahorrar!" subtitle="¡Bienvenido a La Cuponera! Ingresá tu correo electrónico para comenzar" isSignIn="sesion-c" imagen="r-cuponero">
            <form className="needs-validation" onSubmit={handleSubmit}>
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
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={`form-control ${formErrors.password && 'is-invalid'}`} id="formSignupPassword" placeholder="Contraseña" required />
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
                    <div className="invalid-feedback">{formErrors.password}</div>
                </div>
                {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                <div className="mb-3">
                    <button type="submit" /*onClick={handleRegister} */style={{ width: "100%" }} className="btn btn-amarillo">Registrar</button>
                </div>
                <div>¿Ya tenés una cuenta? <Link to="/signin/cuponero" style={{ color: '#0088ff'}}>Iniciar Sesión</Link></div>
            </form>
            <div className="registro-con">
                <div className="col-12 d-grid mb-2">
                    <GoogleLoginButton />
                </div>
                <div className="col-12 d-grid">
                    <FacebookLoginButton />
                </div>
            </div>
        </ContainerMap>
        </>
    );    
}
