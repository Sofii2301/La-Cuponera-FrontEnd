import React, { useState } from 'react';
import { uploadLogoImage, updateLogoImage, deleteLogoImage } from '../../services/vendedoresService';

const UploadLogo = ({ vendedorId, existingImage }) => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage('');

        if (!image) {
            setMessage('Por favor, seleccione una imagen para subir.');
            return;
        }

        try {
            existingImage ? await updateLogoImage(vendedorId, image) : await uploadLogoImage(vendedorId, image);
            setMessage('Imagen subida correctamente');
        } catch (error) {
            setMessage('Error al subir la imagen. Inténtalo de nuevo.');
        }
    };

    const handleDelete = async () => {
        setMessage('');
        try {
            await deleteLogoImage(vendedorId);
            setMessage('Imagen eliminada correctamente');
        } catch (error) {
            setMessage('Error al eliminar la imagen. Inténtalo de nuevo.');
        }
    };

    return (
        <div>
            <h2 className='mb-4'>{existingImage ? 'Actualizar Logo' : 'Subir Logo'}</h2>
            <form onSubmit={handleUpload}>
                <label className='mb-4'>Selecciona el archivo de imagen (jpeg, jpg, png, gif): </label>
                <input className='mb-4' type="file" onChange={handleImageChange} />
                <button className='mb-4 btn btn-rosa' type="submit">{existingImage ? 'Actualizar' : 'Subir'} Imagen</button>
                {existingImage && <button className='mb-4 btn btn-danger' type="button" onClick={handleDelete}>Eliminar Imagen</button>}
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UploadLogo;