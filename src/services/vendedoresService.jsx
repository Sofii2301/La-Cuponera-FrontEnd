import { API_BASE_URL_VENDEDOR, API_BASE_URL_IMAGEN } from '../../config';

export const getVendedores = async (Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const url = `${API_BASE_URL_VENDEDOR}${Complete}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Error al obtener los vendedores:', error);
        throw error;
    }
};


export const getVendedorById = async (id, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}${Complete}/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el vendedor:', error);
        throw error;
    }
};

export const createVendor = async (vendorData, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}${Complete}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendorData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el vendedor:', error);
        throw error;
    }
};

export const updateVendor = async (id, vendorData, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const url = `${API_BASE_URL_VENDEDOR}${Complete}/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendorData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el vendedor:', error);
        throw error;
    }
};

export const deleteVendor = async (id, Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const response = await fetch(`${API_BASE_URL_VENDEDOR}${Complete}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el vendedor');
        }
        return { message: 'Vendedor eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el vendedor:', error);
        throw error;
    }
};

export const uploadImage = async (id, imageFile, imageType) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        
        const response = await fetch(`${API_BASE_URL_IMAGEN}/${id}/${imageType}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en la carga de la imagen: ${errorText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Error interno del servidor al cargar la imagen.');
    }
};

export const requestPasswordReset = async (email) => {
    const response = await fetch(`${API_BASE_URL_VENDEDOR}/request-password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    });
    if (!response.ok) {
        throw new Error('Error al solicitar restablecimiento de contraseña');
    }
    return await response.json();
};

export const resetPassword = async (token, newPassword) => {
    const response = await fetch(`${API_BASE_URL_VENDEDOR}/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, newPassword })
    });
    if (!response.ok) {
        throw new Error('Error al restablecer la contraseña');
    }
    return await response.json();
};

// Funciones para manejar imágenes de logos

export const getLogoImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_IMAGEN}/logos/${id}`, {
            headers: {
                'Content-Type': 'image' 
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la imagen del logo');
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen del logo:', error);
        throw error;
    }
};

export const uploadLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_IMAGEN}/logos/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen del logo');
        }
         // Obtener la imagen como un blob
        return await response.json(); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al subir la imagen del logo:', error);
        throw error;
    }
};

export const updateLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_IMAGEN}/logos/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen del logo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};

export const deleteLogoImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_IMAGEN}/logos/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la imagen del logo');
        }
        return { message: 'Imagen del logo eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen del logo:', error);
        throw error;
    }
};

// Funciones para manejar imágenes de portadas

export const getCoverImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_IMAGEN}/portadas/${id}`, {
            headers: {
                'Content-Type': 'image' 
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener la imagen de la portada');
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen de la portada:', error);
        throw error;
    }
};

export const uploadCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_IMAGEN}/portadas/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen de la portada');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al subir la imagen de la portada:', error);
        throw error;
    }
};

export const updateCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_IMAGEN}/portadas/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen de la portada');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen de la portada:', error);
        throw error;
    }
};

export const deleteCoverImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_IMAGEN}/portadas/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la imagen de la portada');
        }
        return { message: 'Imagen de la portada eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen de la portada:', error);
        throw error;
    }
};