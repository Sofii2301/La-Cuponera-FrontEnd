import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Multiselect from "multiselect-react-dropdown";
import cuponik from "../../assets/cuponik/CuponicSaludo3-derecha.gif";
//import { categoriesOptions } from '../../data/CategoriesData';

import NavVendedor from "../../components/Vendedor/NavVendedor";

export default function RegistroCompletoV(props) {
    const [formData, setFormData] = useState({
        socialInstagram: '',
        socialFacebook: '',
        socialLinkedin: '',
        socialOtro: '',
        redesSociales: "",
        paginaWeb: "",
        horariosTiendaFisica: "",
        representanteLegal: "",
        Nit: "",
        categorias: []
    });
    const [formErrors, setFormErrors] = useState({
        representativeName: '',
        companyNIT: '',
        categories: []  
    });
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const [showCategories, setShowCategories] = useState(false);

    useEffect(() => {
        const vendedorData = localStorage.getItem("vendedorData");
        if (vendedorData) {
            const parsedData = JSON.parse(vendedorData);
            setFormData(parsedData);
        }
    }, []);

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
        if (!isValid) return;
        
        try {
            const response = await fetch('https://lacuponera-vendedores.vercel.app/api/vendedores/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                const registroVendedorCompletoValue = true; 
                localStorage.setItem("vendedorData", JSON.stringify(formData));
                const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
                localStorage.setItem("vendedorData",
                    JSON.stringify({ ...vendedorData, registroVendedorCompleto:registroVendedorCompletoValue }));
                navigate("/vendedor/");
            } else {
                setErrorMessage(data.message);
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
        // Validar cada campo
        if (!formData.representanteLegal.trim()) {
            errors.representativeName = "Por favor, ingresá los datos del Representante Legal de la tienda";
            isValid = false;
        }
        console.log(isValid);
        if (!formData.Nit.trim()) {
            errors.companyNIT="Por favor, ingresá tu Número de identificación tributaria (NIT)";
            isValid = false;
        }
        if (showCategories && formData.categorias.length === 0) {
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
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
    };

    const categoryOptions = [
        'Para ti', "Para los peludos", "Para disfrutar", 'Para tu paladar', 
        'Para quien amas', 'Para tu hogar', 'Para tu bienestar', 'Para tu mente', 
        'Inmobiliaria & Automotriz', 'Tecnología', 'Para tu mesa', 'Para los gobernantes', 
        'Servicios Profesionales', 'Reciclá & Ganá'
    ];

    const handleCategoryChange = (selectedList) => {
        setFormData(prevState => ({
            ...prevState,
            categories: selectedList
            
        }));
        console.log(selectedList);
    };
    
    const handleCategoryRemove = (selectedList) => {
        setFormData(prevState => ({
            ...prevState,
            categories: selectedList
        }));
        console.log(selectedList);
    };
    

    useEffect(() => {
        const vendedorData = JSON.parse(localStorage.getItem("vendedorData"));
        if (vendedorData){
            // Verificar si el registro principal del vendedor está completo
            if (!vendedorData.registroVendedor) {
                console.log("RegistroCompletoV-registro ppal: ", vendedorData.registroVendedor);
                navigate("/signup/vendedor");
            } else {// Verificar si el registro total del vendedor está completo 
                if (vendedorData.registroVendedorCompleto) {
                    console.log("RegistroCompletoV-registro total: ", vendedorData.registroVendedorCompleto);
                    navigate("/vendedor/");
                } 
            }
        } else {
            navigate("/");
        }
    }, []);

    return(
        <>
        <NavVendedor>
            <div className="row row-titulo-v justify-content-center">
                <div className="col-6 mx-auto col-titulo-v justify-content-center">
                    <div className="container-titulo-v mb-lg-9< text-center">
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
                <div className="col-5 mx-auto col-cuponik-v">
                    <div>
                        <img className="cuponik-saludo" src={cuponik} />
                    </div>
                </div>
            </div>  
            <div id="containerFormV" className="row row-formulario-v justify-content-center align-items-center">
                <div className={`formulario-vendedor col-10 mx-auto ${showCategories ? 'd-none' : ''}`}>
                    <form id="storeRegistrationFormA" className="needs-validation"> 
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="storeHours" className="form-label">Horarios de atencion de tu Tienda Fisica</label>
                                <input type="text" onChange={handleChange} value={formData.horariosTiendaFisica} name="horariosTiendaFisica" className={`form-control ${formErrors.storeHours && 'is-invalid'}`} id="horariosTiendaFisica" placeholder="Horarios de tu Tienda Fisica" />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.storeHours}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="representativeName" className="form-label">Nombre y Apellidos del Representante Legal</label>
                                <input type="text" onChange={handleChange} value={formData.representanteLegal} name="representanteLegal" className={`form-control ${formErrors.representativeName && 'is-invalid'}`} id="representanteLegal" placeholder="Representante Legal" required />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.representativeName}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                            <label htmlFor="companyNIT" className="form-label">NIT De empresa</label>
                            <input type="number" onChange={handleChange} value={formData.Nit} name="Nit" className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} id="Nit" placeholder="NIT" required />
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
                            <div className="col mb-3">
                                <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-instagram"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={formData.socialInstagram} name="socialInstagram" className={`form-control ${formErrors.socialInstagram && 'is-invalid'}`} id="socialInstagram" placeholder="Instagram" />
                                        <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.socialInstagram}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-facebook"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={formData.socialFacebook} name="socialFacebook" className={`form-control ${formErrors.socialFacebook && 'is-invalid'}`} id="socialFacebook" placeholder="Facebook" />
                                        <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.socialFacebook}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={formData.socialLinkedin} name="socialLinkedin" className={`form-control ${formErrors.socialLinkedin && 'is-invalid'}`} id="socialLinkedin" placeholder="Linkedin" />
                                        <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.socialLinkedin}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i class="bi bi-chat"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={formData.socialOtro} name="socialOtro" className={`form-control ${formErrors.socialOtro && 'is-invalid'}`} id="socialOtro" placeholder="Otro" />
                                        <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.socialOtro}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="websiteLink" className="form-label">Página web Link</label>
                                <input type="text" onChange={handleChange} value={formData.paginaWeb} name="paginaWeb" className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} id="paginaWeb" placeholder="Link a la pagina web" />
                                <div className="invalid-feedback" style={{ color: 'white' }}>{formErrors.websiteLink}</div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <label htmlFor="categories" className="form-label">Categorías</label>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <Multiselect
                                    isObject={false}
                                    onRemove={handleCategoryRemove}
                                    onSelect={handleCategoryChange}
                                    options={category}
                                    selectedValues={formData.categorias}
                                />
                                {formErrors.categories && (
                                    <div className="invalid-feedback d-block" style={{ color: 'white' }}>
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
        </NavVendedor>
        </>
    )
}

