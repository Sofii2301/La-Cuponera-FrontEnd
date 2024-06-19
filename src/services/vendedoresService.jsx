import { API_BASE_URL_VENDEDOR, API_BASE_URL_IMAGEN } from '../../config';

export const getVendedores = async () => {
    try {
        const url = `${API_BASE_URL_VENDEDOR}`;

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


export const getVendedorById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/${id}`);
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

export const createVendor = async (vendorData) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}`, {
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

export const updateVendor = async (id, vendorData) => {
    try {
        const url = `${API_BASE_URL_VENDEDOR}/${id}`;
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

export const deleteVendor = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/${id}`, {
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