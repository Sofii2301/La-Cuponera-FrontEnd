// src/components/UploadImage.jsx

import React, { useState } from 'react';
import { uploadImage } from '../services/uploadService';

const UploadImage = ({ vendorId, imageType }) => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleImageTypeChange = (e) => {
        setImageType(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!image) {
            setMessage('Por favor, seleccione una imagen para subir.');
            return;
        }

        try {
            const result = await uploadImage(vendorId, image, imageType);
            setMessage(`Imagen subida correctamente: ${result.imagePath}`);
        } catch (error) {
            setMessage('Error al subir la imagen. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2>Subir Imagen</h2>
            <form onSubmit={handleSubmit}>
                <label>Selecciona el archivo de imagen(jpeg,jpg,png,gif): </label>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">Subir Imagen</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadImage;
