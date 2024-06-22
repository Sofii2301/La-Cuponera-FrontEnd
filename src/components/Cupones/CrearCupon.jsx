import React, { useState } from 'react';
import { useAuth } from '../../services/AuthContext';
import { createCoupon, uploadCouponImage } from '../../services/CuponesService';
import { useNavigate } from 'react-router-dom';
import Vendedor from '../Vendedor/Vendedor';

const CreateCupon = () => {
    const { user } = useAuth();
    const [newCoupon, setNewCoupon] = useState({
        title: '',
        description: '',
        discount: 0,
        expirationDate: '',
        image: null,
        createdAt: new Date(),
        createdBy: user
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setNewCoupon(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const createdCoupon = await createCoupon(newCoupon);
            if (newCoupon.image) {
                await uploadCouponImage(createdCoupon._id, newCoupon.image);
            }
            setNewCoupon({
                title: '',
                description: '',
                discount: 0,
                expirationDate: '',
                image: null,
                createdAt: new Date(),
                createdBy: user
            });
            navigate('/vendedor/cupones/mis-cupones');
        } catch (error) {
            console.error('Error al crear cupón:', error);
            setError('Error al crear cupón. Por favor, inténtalo de nuevo.');
        }
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
                                                        onChange={(e) => setNewCoupon({ ...newCoupon, title: e.target.value })}
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
                                                        onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
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
                                                        onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
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
                                                        onChange={(e) => setNewCoupon({ ...newCoupon, expirationDate: e.target.value })}
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
