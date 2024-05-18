// src/components/EditCupon.js
import React, { useEffect, useState } from 'react';
import { getCouponById, updateCoupon } from '../../services/CuponesService';
import { useNavigate } from 'react-router-dom';

const EditCupon = (id) => {
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
            navigate('/cupones');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h1>Editar Cupón</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Actualizar</button>
            </form>
        </div>
    );
};

export default EditCupon;