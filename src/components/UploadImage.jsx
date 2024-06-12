import React, { useState } from 'react';
import { uploadImage } from '../services/vendedoresService';

const UploadImage = ({ vendedorId, imageType, onSuccess }) => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!image) {
            setMessage('Por favor, seleccione una imagen para subir.');
            return;
        }

        try {
            const result = await uploadImage(vendedorId, image, imageType);
            setMessage(`Imagen subida correctamente: ${result.imagePath}`);
            onSuccess(result.imagePath);
        } catch (error) {
            setMessage('Error al subir la imagen. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2 className='mb-4'>Subir Imagen</h2>
            <form onSubmit={handleSubmit}>
                <label className='mb-4'>Selecciona el archivo de imagen(jpeg,jpg,png,gif): </label>
                <input className='mb-4' type="file" onChange={handleImageChange} />
                <button className='mb-4 btn btn-rosa' type="submit">Subir Imagen</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadImage;
