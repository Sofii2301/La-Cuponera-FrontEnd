import { getAllRaiting, getRaitingByVendor } from "./CuponesService";

const API_BASE_URL_VENDEDOR = import.meta.env.VITE_API_BASE_URL_VENDEDOR;

export const getVendedores = async (Complete) => {
    try {
        if (!Complete) {
            Complete = '';
        }
        const url = `${API_BASE_URL_VENDEDOR}/vendedores${Complete}`;

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
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`);
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
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}`, {
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
        const url = `${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`;
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
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores${Complete}/${id}`, {
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

export const getPlan = async (id) => {
    const dataplan = await getVendedorById(id);
    return dataplan.plan;
};


export const requestPasswordReset = async (vendedorData,id) => {
    const response = await fetch(`${API_BASE_URL_VENDEDOR}/vendedores/recovery/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(vendedorData)
    });
    if (!response.ok) {
        throw new Error('Error al solicitar restablecimiento de contraseña');
    }
    return await response.json();
};

// Función para obtener video por ID de vendedor
export const getVideoById = async (idVendedor) => {
    try {
        if (!idVendedor) {
            throw new Error('ID inválido para la obtención del video: '+{idVendedor});
        }
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/videos/${idVendedor}`, {
            method: 'GET',
        });

        const data = await response.json();
        const videoUrl = data.videoUrl;

        if (response.status === 404) {
            return null;
        }

        return videoUrl;
    } catch (error) {
        console.error('Error obteniendo el video:', error);
        throw error;
    }
};

// Función para subir video por ID de vendedor
export const uploadVideo = async (idVendedor, formData) => {
    try {
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/videos/${idVendedor}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Error al subir el video: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error subiendo el video:', error);
        throw error;
    }
};

export const deleteVideo = async (idVendedor) => {
    const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/videos/${idVendedor}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Error deleting video');
    }

    return await response.json();
};

// Funciones para manejar imágenes de logos

export const getLogoImage = async (id) => {
    try {
        if (!id) {
            throw new Error('ID inválido para la obtención de la imagen: '+{id});
        }        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/logos/${id}`, {
            headers: {
                'Content-Type': 'image'
            }
        });

        const data = await response.json();
        const imageUrl = data.imageUrl;

        if (response.status === 404) {
            return null;
        }

        return imageUrl;
    } catch (error) {
        console.error('Error al obtener la imagen del logo:', error);
        throw error;
    }
};

export const uploadLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        if (!id) {
            throw new Error('ID inválido para la subida de la imagen: '+{id});
        }        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/logos/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen del logo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al subir la imagen del logo:', error);
        throw error;
    }
};

/*export const updateLogoImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/logos/${id}`, {
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
};*/

export const updateLogoImage = async (existingImage = null, id, imageFile) => {
    try {
        if (!id) {
            throw new Error('ID inválido para la actualización de la imagen: '+{id});
        }
        if(existingImage){
            await deleteLogoImage(id)
        }
        await uploadLogoImage(id, imageFile)
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};

export const deleteLogoImage = async (id) => {
    try {
        if (!id) {
            throw new Error('ID inválido para la eliminación de la imagen: '+{id});
        }        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/logos/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(response.error);
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
        if (!id) {
            throw new Error('ID inválido para la obtanción de la imagen: '+{id});
        }
        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/portadas/${id}`, {
            headers: {
                'Content-Type': 'image'
            }
        });

        const data = await response.json();
        const imageUrl = data.imageUrl;

        if (response.status === 404) {
            return null;
        }

        return imageUrl;
    } catch (error) {
        console.error('Error al obtener la imagen de la portada:', error);
        throw error;
    }
};

export const uploadCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        if (!id) {
            throw new Error('ID inválido para la subida de la imagen: '+{id});
        }        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/portadas/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen de la portada');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al subir la imagen de la portada:', error);
        throw error;
    }
};

/*export const updateCoverImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_VENDEDOR}/upload/portadas/${id}`, {
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
};*/

export const updateCoverImage = async (existingImage = null, id, imageFile) => {
    try {
        if (!id) {
            throw new Error('ID inválido para la actualización de la imagen: '+{id});
        }
        
        if(existingImage){
            await deleteCoverImage(id);
        }
        await uploadCoverImage(id, imageFile)
    } catch (error) {
        console.error('Error al actualizar la imagen del logo:', error);
        throw error;
    }
};

export const deleteCoverImage = async (id) => {
    try {
        if (!id) {
            throw new Error('ID inválido para la eliminación de la imagen: '+{id});
        }
        
        const response = await fetch(`https://cuponera-vendedores-gbyfn.ondigitalocean.app/api/upload/portadas/${id}`, {
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

export const filterVendorsByCategories = async (selectedCategories) => {
    try {
        const stores = await getVendedores('Complete'); // Assuming this function fetches all stores
        return stores.filter(store => {
            const categorias = typeof store.categorias === 'string'
            ? [store.categorias]
            : Array.isArray(store.categorias)
            ? store.categorias
            : [];
            return categorias.some(cat => selectedCategories.includes(cat))
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
}

export const filterVendorsByCategoriesAndStores = async (selectedCategories, stores) => {
    try {
        return stores.filter(store => {
            const categorias = typeof store.categorias === 'string'
            ? [store.categorias]
            : Array.isArray(store.categorias)
            ? store.categorias
            : [];
            return categorias.some(cat => selectedCategories.includes(cat))
        });
    } catch (error) {
        console.error("Error fetching stores:", error);
        return [];
    }
}

export const getRaitingsForStores = async (stores) => {
    const raitings = [];
    
    // Usamos un bucle for...of para recorrer la lista de tiendas
    for (const store of stores) {
      const ratingsByVendor = await getRaitingByVendor(store.vendedor_id); // Obtenemos el raiting del cupón
      for (const raiting of ratingsByVendor) {
        raitings.push(raiting.rating); // Añadimos el raiting a la lista
      }
    }
    return raitings; // Devolvemos la lista de raitings
}

export const getMejoresPuntuados = async (stores) => {
    try {
        const ratings = await getRaitingsForStores(stores);

        // Agrupar las calificaciones por id_vendedor y sumar las calificaciones
        const ratingsByVendor = ratings.reduce((acc, rating) => {
            if (!rating.id_vendedor) return acc;

            // Inicializamos el acumulador para ese tienda con 0 si no existe
            if (!acc[rating.id_vendedor]) {
                acc[rating.id_vendedor] = { sum: 0, count: 0 };
            }

            // Sumar la calificación de manera segura como un número
            const raitingValue = parseFloat(rating.raiting) || 0;
            acc[rating.id_vendedor].sum += raitingValue;
            acc[rating.id_vendedor].count += 1;
            
            return acc;
        }, {});

        // Convertir a una lista de objetos con el promedio y ordenar por promedio
        const sortedRatings = Object.entries(ratingsByVendor)
            .map(([id_vendedor, { sum, count }]) => ({
                id_vendedor,
                raiting: count > 0 ? sum / count : 0
            }))
            .sort((a, b) => b.raiting - a.raiting); // Orden descendente

        // Obtener los detalles de los tiendas
        const tiendas = await Promise.all(sortedRatings.map(async ({ id_vendedor }) => {
            try {
                let tienda = await getVendedorById(id_vendedor, 'Complete'); // Esperar la promesa correctamente
                if (tienda && Array.isArray(tienda) && tienda.length > 0) {
                    tienda = tienda[0];
                    return tienda;
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Error obteniendo el tienda:', error);
                return null;
            }
        }));

        // Filtrar tiendas nulos o indefinidos
        const tiendasFiltrados = tiendas.filter(tienda => tienda !== null);

        return tiendasFiltrados;
    } catch (error) {
        console.error('Error obteniendo las tiendas más vendidos:', error);
    }
};

export const getMasPopulares = async (tiendas) => {
    try {
        const ratings = await getRaitingsForStores(tiendas);

        // Agrupar las calificaciones por id_vendedor y contar la cantidad de calificaciones
        const ratingsByVendor = ratings.reduce((acc, rating) => {
            if (rating.id_vendedor) {
                acc[rating.id_vendedor] = (acc[rating.id_vendedor] || 0) + 1;
            }
            return acc;
        }, {});

        // Convertir a una lista de objetos y ordenar por número de calificaciones
        const sortedRatings = Object.entries(ratingsByVendor)
            .map(([id_vendedor, count]) => ({ id_vendedor, count }))
            .sort((a, b) => b.count - a.count);

        // Obtener los detalles de los stores
        const stores = await Promise.all(sortedRatings.map(async ({ id_vendedor }) => {
            try {
                let store = await getVendedorById(id_vendedor, 'Complete');
                if (store && store.length > 0 && store[0]) {
                    return store[0];
                }
                return null;
            } catch (error) {
                console.error('Error obteniendo el store:', error);
                return null;
            }
        }));

        // Filtrar stores nulos o indefinidos
        return stores.filter(store => store !== null);
    } catch (error) {
        console.error('Error obteniendo los stores más populares:', error);
        return [];
    }
};

export const getNewStores = async (stores) => {
    try {
        // Filtrar y ordenar stores
        const validStores = stores
            .filter(store => {
                // Validar que registroFecha existe y es una fecha válida
                const registroFecha = new Date(store.registroFecha);
                return registroFecha instanceof Date && !isNaN(registroFecha);
            })
            .sort((a, b) => new Date(b.registroFecha) - new Date(a.registroFecha));
    
        return validStores;
    } catch (error) {
        console.error("Error fetching and sorting stores:", error);
        return [];
    }
};