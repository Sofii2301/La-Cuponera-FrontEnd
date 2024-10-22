// src/servicesService.js
const API_BASE_URL_CUPONERO = import.meta.env.VITE_API_BASE_URL_CUPONERO;

export const getCuponeros = async () => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros`);
        if (!response.ok) {
            throw new Error('Error al obtener los cuponeros');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los cuponeros:', error);
        throw error;
    }
};

export const getCuponeroById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el cuponero:', error);
        throw error;
    }
};

export const createCuponero = async (cuponeroData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuponeroData)
        });
        if (!response.ok) {
            throw new Error('Error al crear el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el cuponero:', error);
        throw error;
    }
};

export const updateCuponero = async (id, cuponeroData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cuponeroData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cuponero');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el cuponero:', error);
        throw error;
    }
};

export const deleteCuponero = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cuponero');
        }
        return { message: 'Cuponero eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el cuponero:', error);
        throw error;
    }
};

//solicitar reestablecimiento de contrasena
export const requestPasswordReset = async (cuponeroData,id) => {
    const response = await fetch(`${API_BASE_URL_CUPONERO}/cuponeros/recovery/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuponeroData)
    });
    if (!response.ok) {
        throw new Error('Error al solicitar restablecimiento de contraseña');
    }
    return await response.json();
};

//Perfil

export const subirImagenPerfil = async (userId, imagen) => {
    const formData = new FormData();
    formData.append('imagen', imagen);

    try {
        const response = await fetch(`https://cuponera-cuponeros-e9snn.ondigitalocean.app/api/upload/perfil/${userId}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen de perfil');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al subir la imagen de perfil:', error);
        throw error;
    }
}

/*export const actualizarImagenPerfil = async (userId, imagen) => {
    const formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('nombre', 'perfil');
    console.log('formData keys:', formData.keys());
    console.log('formData imagen ACT:', formData.get('imagen'));

    try {
        const response = await fetch(`${API_BASE_URL_CUPONERO}/upload/perfil/${userId}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la imagen de perfil');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar la imagen de perfil:', error);
        throw error;
    }
}*/

export const actualizarImagenPerfil = async (userId, imagen) => {
    await eliminarImagenPerfil(userId);
    await subirImagenPerfil(userId, imagen);
}

export const obtenerImagenPerfil = async (userId) => {
    try {
        const response = await fetch(`https://cuponera-cuponeros-e9snn.ondigitalocean.app/api/upload/perfil/${userId}`, {
            method: 'GET',
        });

        const data = await response.json();
        const imageUrl = data.imageUrl;

        if (response.status === 404) {
            return null;
        }

        return imageUrl;
    } catch (error) {
        console.error('Error al obtener la imagen de perfil:', error);
        throw error;
    }
}

export const eliminarImagenPerfil = async (userId) => {
    try {
        const response = await fetch(`https://cuponera-cuponeros-e9snn.ondigitalocean.app/api/upload/perfil/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la imagen de perfil');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al eliminar la imagen de perfil:', error);
        throw error;
    }
}