import React, { useState, useEffect } from 'react';
import { useAuth } from '../../services/AuthContext';
import { createCoupon, uploadCouponImage, getCouponsByVendor } from '../../services/CuponesService';
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
        createdBy: user,
        categoria: '', // Agregar el campo categoría aquí
        location: null
    });
    const [error, setError] = useState('');
    const [plan, setPlan] = useState(null);
    const [vendor, setVendor] = useState(null);
    const [image, setImage] = useState(null);
    const [couponCount, setCouponCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVendorData = async () => {
            try {
                const dataplan = await getVendedorById(user);
                setPlan(dataplan);
                const vendorData = await getVendedorById(user, 'Complete');
                setVendor(vendorData[0]);
                console.log("vendor.categorias: ", vendor.categorias)
                if (dataplan.plan === 1) {
                    const coupons = await getCouponsByVendor(user);
                    setCouponCount(coupons.length);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (plan && plan.plan === 1 && couponCount >= 30) {
            setError('Has alcanzado el límite de 30 cupones para tu plan.');
            return;
        }

        try {
            console.log("newCoupon: ", newCoupon)
            const createdCoupon = await createCoupon(newCoupon, user);
            if (newCoupon.image) {
                await uploadCouponImage(createdCoupon._id, image);
            }
            setNewCoupon({
                title: '',
                description: '',
                discount: 0,
                expirationDate: '',
                createdAt: new Date(),
                createdBy: user,
                categoria: '' // Resetear el campo categoría
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
        setNewCoupon({ ...newCoupon, categoria: e.target.value });
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
                                                <div className="mb-3">
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
                                                </div>
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
                                                        name="categoria"
                                                        value={newCoupon.categoria}
                                                        onChange={handleCategoryChange}
                                                        required
                                                    >
                                                        <option value="">Selecciona una categoría</option>
                                                        {vendor && vendor.categorias && vendor.categorias.map((categoria, index) => (
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
