import React, { useState } from 'react';
import { updateLogoImage, deleteLogoImage, updateCoverImage, deleteCoverImage} from '../../services/vendedoresService';
import Spinner from 'react-bootstrap/Spinner';

export const uploadTypes = Object.freeze({
    LOGO: 'Logo',
    PORTADA: 'Portada',
});

const UploadLogo = ({ vendedorId, existingImage, title, type, refetch, onDelete}) => {
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [formErrors, setFormErrors] = useState({});

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setFormErrors({ image: 'La imagen no debe pesar más de 5 MB.' });
                setImage(null);
                return;
            }
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                if (img.width > 1024 || img.height > 1024) {
                    setFormErrors({ image: 'La imagen no debe medir más de 1024px x 1024px.' });
                    setImage(null);
                } else {
                    setFormErrors({ image: '' });
                    setImage(file);
                }
            };
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        if (!image) {
            setMessage('Por favor, seleccione una imagen para subir.');
            return;
        }

        if(type == uploadTypes.LOGO){
            try {
                await updateLogoImage(existingImage, vendedorId, image);
                setMessage( !existingImage ? 'Imagen subida correctamente' : 'Imagen actualizada correctamente');
                refetch();
                setLoading(false);
            } catch (error) {
                setMessage('Error al subir la imagen. Inténtalo de nuevo.');
                setLoading(false);
            }
        }

        if(type == uploadTypes.PORTADA){
            try {
                await updateCoverImage(existingImage, vendedorId, image);
                setMessage( !existingImage ? 'Imagen subida correctamente' : 'Imagen actualizada correctamente');
                refetch();
                setLoading(false);

            } catch (error) {
                setMessage('Error al subir la imagen. Inténtalo de nuevo.');
                setLoading(false);
            }
        }
    };


    const handleDelete = async () => {
        setLoading(true);
        setMessage('');
        try {
            if(type == uploadTypes.LOGO){
                await deleteLogoImage(vendedorId);
            } else {
                await deleteCoverImage(vendedorId);
            }
            onDelete();
            setLoading(false);
            setMessage('Imagen eliminada correctamente');
        } catch (error) {
            setMessage('Error al eliminar la imagen. Inténtalo de nuevo.');
            setLoading(false);
        }
    };

    return (

            isLoading ?
                <div className='w-full text-center py-5'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Actualizando la imagen...</span>
                    </Spinner>
                </div>


            :
            <>
                <form onSubmit={handleUpload}>
                    {existingImage}
                    <label className='my-4'>Selecciona el archivo de imagen (jpeg, jpg, png, gif): </label>
                    <input className='mb-4' type="file" onChange={handleImageChange} />
                    {formErrors.image && <p style={{ color: 'red' }}>{formErrors.image}</p>}
                    <button className='mb-4 btn btn-rosa' type="submit">{'Subir'} Imagen</button>
                    {existingImage && <button className='mb-4 ms-2 btn btn-danger' type="button" onClick={handleDelete}>Eliminar Imagen</button>}
                </form>
                {message && <p>{message}</p>}
            </>

    );
};

export default UploadLogo;
