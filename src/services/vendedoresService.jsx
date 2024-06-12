import { API_BASE_URL_VENDEDOR } from '../../config';

export const getVendedores = async () => {
    try {
        const url = `${API_BASE_URL_VENDEDOR}`;
        console.log('Fetching from URL:', url);
        const response = await fetch(url);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Error al obtener los vendedores');
        }
        const data = await response.json();
        console.log('Data received:', data);
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
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/${id}`, {
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

//enviar mail de verificacion
export const sendVerificationEmailV = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al enviar el correo de verificación.' };
    }
};

//verificar token ingresado por el usuario
export const verifyTokenV = async (email, token) => {
    try {
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/verify`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, token }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { success: false, message: 'Error interno del servidor al verificar el token.' };
    }
};

export const uploadImage = async (id, imageFile, imageType) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('type', imageType);

        const response = await fetch(`${API_BASE_URL_VENDEDOR}/${id}/${imageType}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error en la carga de la imagen');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
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