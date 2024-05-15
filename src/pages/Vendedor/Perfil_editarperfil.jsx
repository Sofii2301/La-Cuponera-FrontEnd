import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Multiselect from "multiselect-react-dropdown";
import Vendedor from "../../components/Vendedor/Vendedor";

export default function Perfil_editarPerfil() {
    const [userData, setUserData] = useState({
        storeName: '',
        storeAddress: '',
        phoneNumber: '',
        storeDescription: '',
        socialInstagram: '',
        socialFacebook: '',
        socialLinkedin: '',
        socialOtro: '',
        websiteLink: '',
        storeHours: '',
        representativeName: '',
        companyNIT: '',
        categories: [],
        portada: "",
        logo: ""
    });
    const [formErrors, setFormErrors] = useState({
        storeName: '',
        phoneNumber: '',
        storeDescription: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        // Obtener los datos del usuario almacenados en localStorage
        const userDataFromLocalStorage = JSON.parse(localStorage.getItem('vendedorData'));
        if (userDataFromLocalStorage) {
            setUserData(userDataFromLocalStorage);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validateForm();
        if (!isValid) {
            return; // No enviar el formulario si hay errores
        }
        // Guardar los datos del usuario actualizados en localStorage
        localStorage.setItem('vendedorData', JSON.stringify(userData));
        alert('Datos actualizados correctamente.');
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};

        // Validar cada campo
        if (userData.storeName.trim() === '') {
            errors.storeName = 'Por favor, ingresa el nombre de tu tienda';
            isValid = false;
        }

        if (userData.phoneNumber.trim() === '') {
            errors.phoneNumber = 'Por favor, ingresa un número de teléfono';
            isValid = false;
        }

        if (userData.email.trim() === '') {
            errors.email = 'Por favor, ingresa el correo electrónico de tu marca';
            isValid = false;
        }

        if (userData.password.trim() === '') {
            errors.password = 'Por favor, ingresa tu contraseña';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const [category, setCategory] = useState(['Para ti', "Para los peludos", "Para disfrutar", 'Para tu paladar', 
    'Para quien amas', 'Para tu hogar', 'Para tu bienestar', 'Para tu mente', 'Inmobiliaria & Automotriz', 'Tecnología', 'Para tu mesa', 'Para los gobernantes', 'Servicios Profesionales', 'Reciclá & Ganá']);

    const handleCategoryChange = (selectedList, selectedItem) => {
        setFormData(prevState => ({
            ...prevState,
            categories: selectedList
            
        }));
        console.log(selectedList);
    };
    
    const handleCategoryRemove = (selectedList, removedItem) => {
        setFormData(prevState => ({
            ...prevState,
            categories: selectedList
        }));
        console.log(selectedList);
    };

    return (
        <>
            <Vendedor>
            <div className="container-editar-perfil">
                <h2 className="mb-5 titulo-editar-perfil">Editar Datos del Usuario</h2>
                <form id="editStoreForm" onSubmit={handleSubmit}>
                    <div className="row row-1-home g-3">
                        <div className="col col-rv mb-3">
                            <label htmlFor="storeName" className="form-label">
                                Nombre de la tienda
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.storeName && 'is-invalid'}`}
                                id="storeName"
                                name="storeName"
                                value={userData.storeName}
                                onChange={handleChange}
                                placeholder="Ingresa el nombre de tu tienda"
                                required
                            />
                            <div className="invalid-feedback">
                                {formErrors.storeName}
                            </div>
                        </div>
                        <div className="col col-rv mb-3">
                            <label htmlFor="storeAddress" className="form-label">
                                Tienda Física
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.storeAddress && 'is-invalid'}`}
                                id="storeAddress"
                                name="storeAddress"
                                value={userData.storeAddress}
                                onChange={handleChange}
                                placeholder="Dirección de tu tienda física"
                            />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col col-rv mb-3">
                            <label htmlFor="phoneNumber" className="form-label">
                                Teléfono de Contacto
                            </label>
                            <input
                                type="text"
                                className={`form-control ${formErrors.phoneNumber && 'is-invalid'}`}
                                id="phoneNumber"
                                name="phoneNumber"
                                value={userData.phoneNumber}
                                onChange={handleChange}
                                placeholder="Número de Contacto / Whatsapp Business"
                                required
                            />
                            <div className="invalid-feedback">
                                {formErrors.phoneNumber}
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col col-rv mb-3">
                            <label htmlFor="storeDescription" className="form-label">
                                Descripción Comercial
                            </label>
                            <textarea
                                className="form-control"
                                id="storeDescription"
                                name="storeDescription"
                                value={userData.storeDescription}
                                onChange={handleChange}
                                rows="3"
                                placeholder="Quiénes son? Qué hacen?"
                            ></textarea>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col mb-3">
                            <label htmlFor="storeHours" className="form-label">Horarios de atencion de tu Tienda Fisica</label>
                            <input type="text" onChange={handleChange} value={userData.storeHours} name="storeHours" className={`form-control ${formErrors.storeHours && 'is-invalid'}`} id="storeHours" placeholder="Horarios de tu Tienda Fisica" />
                            <div className="invalid-feedback">{formErrors.storeHours}</div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col mb-3">
                            <label htmlFor="representativeName" className="form-label">Nombre y Apellidos del Representante Legal</label>
                            <input type="text" onChange={handleChange} value={userData.representativeName} name="representativeName" className={`form-control ${formErrors.representativeName && 'is-invalid'}`} id="representativeName" placeholder="Representante Legal" required />
                            <div className="invalid-feedback">{formErrors.representativeName}</div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col mb-3">
                        <label htmlFor="companyNIT" className="form-label">NIT De empresa</label>
                        <input type="number" onChange={handleChange} value={userData.companyNIT} name="companyNIT" className={`form-control ${formErrors.companyNIT && 'is-invalid'}`} id="companyNIT" placeholder="NIT" required />
                        <div className="invalid-feedback">{formErrors.companyNIT}</div>
                        </div>
                    </div>
                    <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-instagram"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={userData.socialInstagram} name="socialInstagram" className={`form-control ${formErrors.socialInstagram && 'is-invalid'}`} id="socialInstagram" placeholder="Instagram" />
                                        <div className="invalid-feedback">{formErrors.socialInstagram}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-facebook"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={userData.socialFacebook} name="socialFacebook" className={`form-control ${formErrors.socialFacebook && 'is-invalid'}`} id="socialFacebook" placeholder="Facebook" />
                                        <div className="invalid-feedback">{formErrors.socialFacebook}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i className="bi bi-linkedin"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={userData.socialLinkedin} name="socialLinkedin" className={`form-control ${formErrors.socialLinkedin && 'is-invalid'}`} id="socialLinkedin" placeholder="Linkedin" />
                                        <div className="invalid-feedback">{formErrors.socialLinkedin}</div>
                                    </div>
                                </div>
                                <div className="row mb-3 row-social-rvc">
                                    <div className="col-1 icon-rvc">
                                        <i class="bi bi-chat"></i>
                                    </div>
                                    <div className="col-11">
                                        <input type="text" onChange={handleChange} value={userData.socialOtro} name="socialOtro" className={`form-control ${formErrors.socialOtro && 'is-invalid'}`} id="socialOtro" placeholder="Otro" />
                                        <div className="invalid-feedback">{formErrors.socialOtro}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="websiteLink" className="form-label">Página web Link</label>
                                <input type="text" onChange={handleChange} value={userData.websiteLink} name="websiteLink" className={`form-control ${formErrors.websiteLink && 'is-invalid'}`} id="websiteLink" placeholder="Link a la pagina web" />
                                <div className="invalid-feedback">{formErrors.websiteLink}</div>
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
                                    selectedValues={userData.categories}
                                />
                                {formErrors.categories && (
                                    <div className="invalid-feedback d-block">
                                        {formErrors.categories}
                                    </div>
                                )}
                            </div>
                        </div>
                    <div className="col col-rv-12 d-grid">
                        <button
                            type="submit"
                            className="btn btn-amarillo"
                        >
                            Guardar Cambios
                        </button>
                    </div>
                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                </form>
            </div>
            </Vendedor>
        </>
    );
}