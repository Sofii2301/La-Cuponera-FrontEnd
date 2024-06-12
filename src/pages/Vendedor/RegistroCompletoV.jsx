import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Multiselect from "multiselect-react-dropdown";
import cuponik from "../../assets/cuponik/CuponicSaludo3-derecha.gif";
import GenericModal from '../../components/Modal';
import SocialMediaDisplay from '../../components/Vendedor/SocialMediaDisplay';
import SocialMediaInput from "../../components/Vendedor/SocialMediaInput";
import { useAuth } from "../../services/AuthContext";
import { getVendedorById, updateVendor } from "../../services/vendedoresService";
import Vendedor from "../../components/Vendedor/Vendedor";
import MapMarker from "../../components/MapMarker";
import MapLatLong from "../../components/MapLatLong";
import CambiarPlan from "../../components/Planes/CambiarPlan";
import HorarioSelector from "../../components/Vendedor/HorarioSelector"
import HorarioDisplay from "../../components/Vendedor/HorarioDisplay"

export default function RegistroCompletoV(props) {
    const { user, authState } = useAuth();
    const [formData, setFormData] = useState({
        redesSociales: "",
        paginaWeb: "",
        horariosTiendaFisica: "",
        representanteLegal: "",
        Nit: 0,
        raiting: 0,
        categorias: [],
        portada: "",
        logo: "",
        seguidores: [],
        location: null,
        
        //segundoRegistro: false 
    });
    const [formErrors, setFormErrors] = useState({
        representativeName: '',
        companyNIT: '',
        categorias: []  
    });
    const [errorMessage, setErrorMessage] = useState('');

    const vendedorId = String(user);
    
    const [showModalSocial, setShowModalSocial] = useState(false);
    const [showModalMap, setShowModalMap] = useState(false);
    const [socialMediaString, setSocialMediaString] = useState('');
    const navigate = useNavigate();
    const [showPlanSelection, setShowPlanSelection] = useState(true);
    const [showCategories, setShowCategories] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    const [currentPlan, setCurrentPlan] = useState('');
    const [horarios, setHorarios] = useState({});

    //////////////////////////////////////////////////////////////////////////////
    /*useEffect(() => {
        const data = JSON.parse(localStorage.getItem("laCuponeraData"));
        setFormData(data.cuponeraData);
    }, []);*/
    //////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        console.log("user: ",user);
        console.log("type: ",authState.userType);
        /*if (!(authState.userType === "vendedor")){
            navigate('/signup/vendedor/');
        } */
        
        const fetchVendedorData = async () => {
            try {
                const data = await getVendedorById(vendedorId);
                console.log("data inicial: ", data)
                setFormData(data);
                setSocialMediaString(data.redesSociales || '');
                setCurrentPlan(data.plan || 'plan1');
                if(data.plan) {console.log("data.plan: ", data)}
                console.log("currentPlan rcv: ", currentPlan)
                if (data.location && data.location.coordinates) {
                    setCoordinates(data.location.coordinates);
                }
            } catch (error) {
                console.error('Error fetching vendor data:', error);
            }
        };
        
        fetchVendedorData();
    }, [vendedorId]);

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
            const updatedData = {
                ...formData,
                horariosTiendaFisica: JSON.stringify(horarios),
                redesSociales: socialMediaString,
                location: {
                    type: "Point",
                    coordinates: coordinates,
                }
                //plan: currentPlan,
                //segundoRegistro: true
            };
            console.log("update: ", updatedData);
            await updateVendor(vendedorId, updatedData);
            navigate("/vendedor/");
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

    const handleNextPlan = () => {
        const isValid = validateFormPlan();
        if (isValid) {
            setShowPlanSelection(false);
        } else 
            setShowPlanSelection(true);
            return;  
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        // Validar cada campo
        if (formData.representanteLegal.trim() === '') {
            errors.representativeName = "Por favor, ingresá los datos del Representante Legal de la tienda";
            isValid = false;
        }
        if (String(formData.Nit).trim() === '') {
            errors.companyNIT="Por favor, ingresá tu Número de identificación tributaria (NIT)";
            isValid = false;
        }
        console.log("categorias:", formData.categorias)
        if (showCategories &&  (!Array.isArray(formData.categorias) || formData.categorias.length === 0)) {
            errors.categorias='Por favor, selecciona al menos una categoría.';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const validateFormPlan = () => {
        let isValid = true;
        const errors = {};
        // Validar cada campo
        if (currentPlan === "") {
            setErrorMessage("Por favor, selecciona un plan antes de continuar.");
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    }

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
            categorias: selectedList
        }));
    };
    
    const handleCategoryRemove = (selectedList) => {
        setFormData(prevState => ({
            ...prevState,
            categorias: selectedList
        }));
    };
    
    const handleOpenModalSocial = () => setShowModalSocial(true);
    const handleCloseModalSocial = () => setShowModalSocial(false);
    const handleOpenModalMap = () => setShowModalMap(true);
    const handleCloseModalMap = () => setShowModalMap(false);

    const handleSaveSocialMedia = (string) => {
        setSocialMediaString(string);
        setFormData((prevUserData) => ({
            ...prevUserData,
            redesSociales: string
        }));
        console.log(formData.redesSociales)
        handleCloseModalSocial();
        setShowModalSocial(false);
    };

    const handleSaveMapCoordinates = (coords) => {
        setCoordinates(coords);
        /*setFormData((prevUserData) => ({
            ...prevUserData,
            location: {
                type: "Point",
                coordinates: coords
            }
        }));
        console.log("Coordinates: ",formData.location.coordinates)*/
        handleCloseModalMap();
        setShowModalMap(false);
    };

    return(
        <>            
            <div className=" row row-titulo-v justify-content-center cuponikBanner">
                <div className="col-6 mx-auto col-titulo-v justify-content-center cuponikBanner2">
                    <div className="container-titulo-v mb-lg-9< text-center mt-3">
                        <h1 className="mb-1 h2 fw-bold titulo titulo-v cuponikH1">¡Bienvenido Vendedor!</h1>
                        <h5 className="mb-lg-4">Estás a unos pocos pasos de ofrecer tus cupones y formar parte de esta gran comunidad.</h5>
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
                <div className={`formulario-vendedor col-11 mx-auto ${showPlanSelection ? '' : 'd-none'}`}>
                    <CambiarPlan currentPlan={currentPlan /*formData.plan*/}/>
                    <div className="col-12 d-grid">
                        <button type="button" onClick={handleNextPlan} className="btn btn-amarillo fw-bold">Siguiente</button>
                    </div>
                    {errorMessage && <div className="mt-3" style={{ color: 'white' }}>{errorMessage}</div>}
                </div>
                <div className={`formulario-vendedor col-10 mx-auto ${showCategories ? 'd-none' : ''}${showPlanSelection ? 'd-none' : ''}`}>
                    <div className="text-center mb-4">
                        <h1 className="titulo fs-80">Registro de tu tienda</h1>
                        <p>Queremos conocerte un poco más, por favor completá los siguientes datos para poder ofrecerte la mejor experiencia.</p>
                    </div>
                    <form className="content-form2-rcv"> 
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
                        <div className="row g-3">
                            <div className="col mb-3">
                                <label htmlFor="horariosTiendaFisica" className="form-label">Horarios de la tienda física</label>
                                <div className="horario-selector-rcv">
                                    <HorarioSelector 
                                        horarios={horarios}
                                        setHorarios={setHorarios}
                                    />
                                </div>
                                <HorarioDisplay horarios={horarios} />
                            </div>
                        </div>
                        <div className="row g-3">
                            <div className="col mb-3 mt-3">
                                <label htmlFor="location" className="form-label mt-2 ">Ubicación de la tienda física</label>
                                <br/>
                                <button type="button" className="btn btn-azul" onClick={handleOpenModalMap}>
                                    Cargar Ubicación Física de la tienda
                                </button>
                                <GenericModal
                                    show={showModalMap}
                                    handleClose={handleCloseModalMap}
                                    title="Cargar Ubicación Física de la tienda"
                                >
                                    <MapMarker 
                                        initialCoordinates={coordinates}
                                        onSave={handleSaveMapCoordinates}
                                        handleClose={handleCloseModalMap}
                                    />
                                </GenericModal>
                                {coordinates && (
                                    <div className="col mb-3 mt-4">
                                        <strong>Coordenadas seleccionadas:</strong>
                                        <MapLatLong coordinates={ coordinates } />
                                        <p>Latitud: {coordinates[0]} Longitud: {coordinates[1]}</p>
                                        {/* {message && <p>{message}</p>} */}
                                    </div>
                                )}
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
                            <div className="col mb-3 completar-registro-social">
                                <label htmlFor="socialMedia" className="form-label">Redes Sociales</label>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-amarillo" onClick={handleOpenModalSocial}>
                                        Cargar Redes Sociales
                                    </button>
                                </div>
                                <label htmlFor="saveSocialMedia" className="form-label">Redes Sociales Guardadas:</label>
                                <SocialMediaDisplay socialMediaString={socialMediaString} />
                                <GenericModal
                                    show={showModalSocial}
                                    handleClose={handleCloseModalSocial}
                                    title="Cargar Redes Sociales"
                                >
                                    <SocialMediaInput onSave={handleSaveSocialMedia} />
                                </GenericModal>
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
                                    options={categoryOptions}
                                    selectedValues={formData.categorias && formData.categorias.map((categoria) => categoria.toString())}
                                />
                                {formErrors.categorias && (
                                    <div className="invalid-feedback d-block" style={{ color: 'white' }}>
                                        {formErrors.categorias}
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
    )
}

