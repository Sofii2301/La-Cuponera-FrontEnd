import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavVendedor from "../components/NavVendedor";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import cuponik from "../assets/cuponik/CuponicSaludo3.gif"

export default function Vendedor() {
    const [formData, setFormData] = useState({
        socialMedia: '',
        websiteLink: '',
        storeHours: '',
        representativeName: '',
        companyNIT: '',
        categories: []
    });
    const [formErrors, setFormErrors] = useState({
        representativeName: '',
        companyNIT: '',
        categories: []  
    });
    const [errorMessage, setErrorMessage] = useState('');

    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
            const response = await fetch('http://localhost:9000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Manejar la respuesta según sea necesario
            } else {
                throw new Error('Error al registrar el vendedor');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Error interno del servidor');
        }
    };

    const handleNext = () => {
        const isValid = validateForm();
        if (isValid) {
            setShowCategories(true);
        } else 
            return;  
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        console.log(isValid);
        // Validar cada campo
        if (!formData.representativeName.trim()) {
            errors.representativeName = "Por favor, ingresá los datos del Representante Legal de la tienda";
            isValid = false;
        }
        console.log(isValid);
        if (!formData.companyNIT.trim()) {
            errors.companyNIT="Por favor, ingresá tu Número de identificación tributaria (NIT)";
            isValid = false;
        }
        if (showCategories && selectedCategories.length === 0) {
            errors.categories='Por favor, selecciona al menos una categoría.';
            isValid = false;
        }
        
        setFormErrors(errors);
        return isValid;
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('containerFormV');
        console.log(formElement)
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const handleCategoryChange = (e) => {
        // Manejar los cambios en las categorías seleccionadas
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedCategories(selectedOptions);
    };

    return (
 <>
            <NavVendedor/>
            <div className="row row-titulo-v justify-content-center">
                <div className="col-5 mx-auto col-cuponik-v">
                    <div>
                        <img className="cuponik-saludo" src={cuponik} />
                    </div>
                </div>
                <div className="col-6 mx-auto col-titulo-v justify-content-center">
                    <div className="container-titulo-v mb-lg-9 mb-5 text-center">
                        <h1 className="mb-1 h2 fw-bold titulo titulo-v">¡Bienvenido Vendedor!</h1>
                        <p id="subtitulo">
                            Completa tu registro para empezar a cargar tus cupones
                        </p>
                    </div>
                    <div className="boton-flecha-v">
                        <button onClick={scrollToForm} className="scroll-btn">
                            <i className="bi bi-chevron-down"></i>
                        </button>
                    </div>
                </div>  
            </div>  
            <div className="row row-formulario-v justify-content-center align-items-center">
                <div id="containerFormV" className={`formulario-vendedor col-10 mx-auto ${showCategories ? 'd-none' : ''}`}>
                    <form id="storeRegistrationFormA" className="needs-validation">
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
                                <input type="text" onChange={handleChange} value={formData.socialMedia} name="socialMedia" className={`form-control ${formErrors.socialMedia && 'is-invalid'}`} id="socialMedia" placeholder="Lhaks/@nombre de tus redes sociales" />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.socialMedia}</div>
                            </div>
                            <div className="col mb-3">
                                <label htmlFor="websiteLink" className="form-label">Página web Link</label>
                                <input type="text" onChange={handleChange} value={formData.websiteLink} name="websiteLink" className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} id="websiteLink" placeholder="Link a la pagina web" />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.websiteLink}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="storeHours" className="form-label">Horarios de atencion de tu Tienda Fisica</label>
                                <input type="text" onChange={handleChange} value={formData.storeHours} name="storeHours" className={`form-control ${formErrors.storeHours && 'is-invalid'}`} id="storeHours" placeholder="Horarios de tu Tienda Fisica" />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.storeHours}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="representativeName" className="form-label">Nombre y Apellidos del Representante Legal</label>
                                <input type="text" onChange={handleChange} value={formData.representativeName} name="representativeName" className={`form-control ${formErrors.representativeName && 'is-invalid'}`} id="representativeName" placeholder="Representante Legal" required />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.representativeName}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                            <label htmlFor="companyNIT" className="form-label">NIT De empresa</label>
                            <input type="number" onChange={handleChange} value={formData.companyNIT} name="companyNIT" className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} id="companyNIT" placeholder="NIT" required />
                            <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.companyNIT}</div>
                            </div>
                        </div>
                        <div className="col-12 d-grid">
                            <button type="button" onClick={handleNext} className="btn btn-amarillo">Siguiente</button>
                        </div>
                        {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                    </form>
                </div>
                <div className={`formulario-vendedor col-10 mx-auto ${!showCategories ? 'd-none' : ''}`}>
                    <form>
                        <div className="row g-3">
                            <label htmlFor="categories" className="form-label">Categorías</label>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <select 
                                    className= {`form-select ${formErrors.categories && 'is-invalid'}`}
                                    id="categories" 
                                    name="categories" 
                                    onChange={handleCategoryChange}
                                    value={selectedCategories}
                                    multiple
                                >
                                    <option value="parati">Para ti</option>
                                    <option value="paralospeludos">Para los peludos</option>
                                    <option value="paradisfrutar">Para disfrutar</option>
                                    <option value="paratupaladar">Para tu paladar</option>
                                    <option value="paraquienamas">Para quien amas</option>
                                    <option value="paratuhogar">Para tu hogar</option>
                                    <option value="paratubienestar">Para tu bienestar</option>
                                    <option value="paratumente">Para tu mente</option>
                                    <option value="inmobiliariayautomotriz">Inmobiliaria & Automotriz</option>
                                    <option value="tecnologia">Tecnología</option>
                                    <option value="paratumesa">Para tu mesa</option>
                                    <option value="paralosgobernantes">Para los gobernantes</option>
                                    <option value="serviciosprofesionales">Servicios Profesionales</option>
                                    <option value="reciclaygana">Reciclá & Ganá</option>
                                </select>
                                {formErrors.categories && (
                                    <div className="invalid-feedback d-block">
                                        {formErrors.categories}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-12 d-grid">
                            <button type="submit"  id="registro" onClick={handleRegister} className="btn btn-amarillo">Registrar</button>
                        </div>
                        {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                    </form>
                </div>
            </div>
        </>
    );
}
    

