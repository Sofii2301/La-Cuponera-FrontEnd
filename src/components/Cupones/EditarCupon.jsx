// src/components/EditCupon.js
import React, { useEffect, useState } from 'react';
import { getCouponById, updateCoupon } from '../../services/CuponesService';
import { useNavigate, useParams } from 'react-router-dom';
import Vendedor from '../Vendedor/Vendedor';

const EditCupon = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        discount: '',
        expirationDate: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const data = await getCouponById(id);
                setFormData(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchCoupon();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCoupon(id, formData);
            navigate('/vendedor/cupones/mis-cupones');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <Vendedor>
            <div className="container-editar-perfil">
                <h1>Editar Cupón</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label>Título:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Descripción:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Descuento:</label>
                        <input
                            className="form-control"
                            type="text"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Fecha de Expiración:</label>
                        <input
                            className="form-control"
                            type="date"
                            name="expirationDate"
                            value={formData.expirationDate}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className='btn btn-rosa'>Actualizar</button>
                </form>
            </div>
            </Vendedor>
        </div>
    );
};

export default EditCupon;