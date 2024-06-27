import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import { createCoupon, uploadCouponImage, getCouponsByVendor, deleteCoupon } from '../../services/CuponesService';
import { useNavigate } from 'react-router-dom';
import { getVendedorById } from '../../services/vendedoresService';
import Vendedor from '../Vendedor/Vendedor';

const CreateCupon = () => {
    const { user } = useAuth();
    const [newCoupon, setNewCoupon] = useState({
        title: '',
        description: '',
        discount: 0,
        expirationDate: '',
        createdAt: '',
        createdBy: String(user),
        categorias: '', 
        location: null
    });
    const [error, setError] = useState('');
    const [plan, setPlan] = useState(null);
    const [vendorCategories, setVendorCategories] = useState(null);
    const [image, setImage] = useState(null);
    const [couponCount, setCouponCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                try {
                    const dataplan = await getVendedorById(user);
                    setPlan(dataplan.plan);
                    if (dataplan.plan === 1) {
                        const coupons = await getCouponsByVendor(user);
                        setCouponCount(coupons.length);
                    }
                }   catch (error) {
                    console.error('Error fetching vendor plan:', error);
                    setError('Error al obtener el plan del vendedor.');
                }
                try {
                    const vendorData = await getVendedorById(user, 'Complete');
                    setVendorCategories(vendorData[0].categorias);
                }   catch (error) {
                    console.error('Error fetching vendor plan:', error);
                    setError('Error al obtener el plan del vendedor.');
                }
                
            } catch (error) {
                console.error('Error fetching vendor data:', error);
                setError('Error al obtener los datos del vendedor.');
            }
        };

        fetchVendorData();
    }, [user]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateForm = () => {
        const errors = {};
        if (!newCoupon.title) errors.title = 'El título es requerido.';
        if (!newCoupon.description) errors.description = 'La descripción es requerida.';
        if (newCoupon.discount <= 0) errors.discount = 'El descuento debe ser mayor a 0.';
        //if (!newCoupon.expirationDate) errors.expirationDate = 'La fecha de expiración es requerida.';
        if (!image) errors.image = 'La imagen es requerida.';
        if (!newCoupon.categorias) errors.categorias = 'La categoría es requerida.';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        if (plan === 1 && couponCount >= 30) {
            setError('Has alcanzado el límite de 30 cupones para tu plan.');
            return;
        }

        try {
            console.log("newCoupon: ", newCoupon)
            const createdCoupon = await createCoupon(newCoupon, user);
            const uploadResponse = await uploadCouponImage(createdCoupon.id, image);
            if (uploadResponse.status !== 200) {
                setError('Error al subir la imagen. Por favor, inténtalo de nuevo.');
                await deleteCoupon(createdCoupon.id);
                return;
            }
            setNewCoupon({
                title: '',
                description: '',
                discount: 0,
                expirationDate: '',
                createdAt: new Date(),
                createdBy: String(user),
                categorias: '',
                location: null
            });
            navigate('/vendedor/cupones/mis-cupones');
        } catch (error) {
            console.error('Error al crear cupón:', error);
            setError('Error al crear cupón. Por favor, inténtalo de nuevo.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon(prevState => ({
            ...prevState,
            [name]: name === 'discount' ? Number(value) : value // Convertir el descuento a número
        }));
    };

    const handleCategoryChange = (e) => {
        setNewCoupon(prevState => ({
            ...prevState,
            categorias: e.target.value
        }));
    };

    return (
        <>
            <Vendedor>
                <div className="row row-sm">
                    <div className="col-lg-12 col-md-12 mt-3">
                        <div className="card custom-card main-content-body-profile">
                            <div className="tab-content">
                                <div className="main-content-body tab-pane p-4 border-top-0 active" id="about" role="tabpanel">
                                    <div className="border rounded-10">
                                        <div className="p-4">
                                            <div className="titulo-form">
                                                <h1>Crear Cupón</h1>
                                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                            </div>
                                            <form onSubmit={handleSubmit} className="mt-2">
                                                <div className="mb-3">
                                                    <label>Título:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="title"
                                                        value={newCoupon.title}
                                                        onChange={handleChange}
                                                        placeholder="Nombre"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Descripción:</label>
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        name="description"
                                                        value={newCoupon.description}
                                                        onChange={handleChange}
                                                        placeholder="Descripción"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Descuento:</label>
                                                    <input
                                                        className="form-control"
                                                        type="number"
                                                        name="discount"
                                                        value={newCoupon.discount}
                                                        onChange={handleChange}
                                                        placeholder="Descuento"
                                                        required
                                                    />
                                                </div>
                                                {/* <div className="mb-3">
                                                    <label>Fecha de Expiración:</label>
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        name="expirationDate"
                                                        value={newCoupon.expirationDate}
                                                        onChange={handleChange}
                                                        placeholder="Fecha de vencimiento"
                                                        required
                                                    />
                                                </div> */}
                                                <div className="mb-3">
                                                    <label>Imagen:</label>
                                                    <input
                                                        className="btn-cargar-img-cc"
                                                        type="file"
                                                        name="image"
                                                        onChange={handleFileChange}
                                                        placeholder="Imagen del cupón"
                                                        required
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label>Categoría:</label>
                                                    <select
                                                        className="form-control"
                                                        name="categorias"
                                                        value={newCoupon.categorias}
                                                        onChange={handleCategoryChange}
                                                        required
                                                    >
                                                        <option value="">Selecciona una categoría</option>
                                                        {vendorCategories && vendorCategories.map((categoria, index) => (
                                                            <option key={index} value={categoria}>{categoria}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <button type="submit" className='btn btn-rosa'>Crear</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Vendedor>
        </>
    );
};

export default CreateCupon;
