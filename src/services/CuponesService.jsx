// src/services/couponService.js
const API_BASE_URL_CUPONES = import.meta.env.VITE_API_BASE_URL_CUPONES;

export const getCoupons = async () => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones`);
        if (!response.ok) {
            throw new Error('Error al obtener los cupones');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los cupones:', error);
        throw error;
    }
};

export const getCouponById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones/${id}`);
        if (!response.ok) {
            throw new Error('Error al obtener el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener el cupón:', error);
        throw error;
    }
};

export const getCouponsByVendor = async (vendorId) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones/createdBy/${vendorId}`);
        if (!response.ok) {
            throw new Error('Error al obtener los cupones del vendedor');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los cupones del vendedor:', error);
        throw error;
    }
};

export const createCoupon = async (couponData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(couponData),
        });
        if (!response.ok) {
            throw new Error('Error al crear el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al crear el cupón:', error);
        throw error;
    }
};

export const updateCoupon = async (id, couponData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(couponData)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar el cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar el cupón:', error);
        throw error;
    }
};

export const deleteCoupon = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/cupones/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el cupón');
        }
        return { message: 'Cupón eliminado correctamente' };
    } catch (error) {
        console.error('Error al eliminar el cupón:', error);
        throw error;
    }
};

// Funciones para manejar imágenes de cupones

export const getCouponImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/upload/cupones/${id}`, {
            headers: {
                'Content-Type': 'image' 
            }
        });

        if (response.status === 404) {
            return { status: 404, data: null };
        }

        if (!response.ok) {
            throw new Error('Error al obtener la imagen del cupón');
        }
        const blob = await response.blob(); // Obtener la imagen como un blob
        return URL.createObjectURL(blob); // Crear una URL de objeto para la imagen
    } catch (error) {
        console.error('Error al obtener la imagen del cupón:', error);
        throw error;
    }
};

export const uploadCouponImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_CUPONES}/upload/cupones/${id}`, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al subir la imagen del cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al subir la imagen del cupón:', error);
        throw error;
    }
};

export const updateCouponImage = async (id, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('imagen', imageFile);
        const response = await fetch(`${API_BASE_URL_CUPONES}/upload/cupones/${id}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la imagen del cupón');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al actualizar la imagen del cupón:', error);
        throw error;
    }
};

export const deleteCouponImage = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/upload/cupones/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la imagen del cupón');
        }
        return { message: 'Imagen del cupón eliminada correctamente' };
    } catch (error) {
        console.error('Error al eliminar la imagen del cupón:', error);
        throw error;
    }
};

export const addRaiting = async (vendorId, raitingData) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/raiting/${vendorId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(raitingData)
        });
        if (!response.ok) {
            throw new Error('Error al agregar el raiting');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al agregar el raiting:', error);
        throw error;
    }
}

export const getAllRaiting = async () => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/raiting/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener el raiting');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el raiting:', error);
        throw error;
    }
}

export const getRaiting = async (couponId) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/raiting/${couponId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al obtener el raiting');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al obtener el raiting:', error);
        throw error;
    }
}

export const deleteRaiting = async (raitingId) => {
    try {
        const response = await fetch(`${API_BASE_URL_CUPONES}/raiting/${raitingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Error al eliminar el raiting');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al eliminar el raiting:', error);
        throw error;
    }
}

export const getRaitingByCoupon = async (couponId) => {
    try {
        const ratings = await getAllRaiting();
        const compras = [];
        for (const rating of ratings) {
            if (String(couponId) == rating.id_cupon) {
                compras.push({rating});
            }
        }
        return compras;
    } catch (error) {
        console.error('Error al obtener el raiting:', error);
        throw error;
    }
}

export const getRaitingByVendor = async (vendorId) => {
    try {
        const ratings = await getAllRaiting();
        const compras = [];
        for (const rating of ratings) {
            if (String(vendorId) === rating.id_vendedor) {
                compras.push({rating});
            }
        }
        return compras;
    } catch (error) {
        console.error('Error al obtener el raiting:', error);
        throw error;
    }
}

export const getRaitingByCuponero = async (cuponeroId) => {
    try {
        const ratings = await getAllRaiting();
        const compras = [];
        for (const rating of ratings) {
            if (String(cuponeroId) === rating.user_id) {
                compras.push({rating});
            }
        }
        return compras;
    } catch (error) {
        console.error('Error al obtener el raiting:', error);
        throw error;
    }
}


export const filterCouponsByCategories = async (selectedCategories) => {
    try {
      const coupons = await getCoupons();
      return coupons.filter(coupon => {
        console.log('coupon.categorias:', coupon.categorias); // Añadir esto para depuración
        
        // Convertir en array si es una cadena, o verificar que es un array
        const categorias = typeof coupon.categorias === 'string'
          ? [coupon.categorias]
          : Array.isArray(coupon.categorias)
          ? coupon.categorias
          : [];
  
        return categorias.some(cat => selectedCategories.includes(cat));
      });
    } catch (error) {
      console.error("Error fetching coupons:", error);
      return [];
    }
  }
  

export const getMejoresPuntuados = async () => {
    try {
        const ratings = await getAllRaiting();

        console.log('ratings: ', ratings)

        // Agrupar las calificaciones por id_cupon y sumar las calificaciones
        const ratingsByCoupon = ratings.reduce((acc, rating) => {
            if (!rating.id_cupon) return acc;

            // Inicializamos el acumulador para ese cupon con 0 si no existe
            if (!acc[rating.id_cupon]) {
                acc[rating.id_cupon] = { sum: 0, count: 0 };
            }

            console.log('rating: ', rating)
            console.log('rating.id_cupon: ', rating.id_cupon)

            // Sumar la calificación de manera segura como un número
            const raitingValue = parseFloat(rating.raiting) || 0;
            acc[rating.id_cupon].sum += raitingValue;
            acc[rating.id_cupon].count += 1;

            /*if (rating.id_cupon && rating.raiting !== null && rating.raiting !== undefined) {
                acc[rating.id_cupon] += rating.raiting;
            } else {
                acc[rating.id_cupon] = rating.raiting;
            }*/
            
            return acc;
        }, {});

        console.log('ratingsByCoupon: ', ratingsByCoupon)

        // Convertir a una lista de objetos y ordenar por calificación
        /*const sortedRatings = Object.entries(ratingsByCoupon)
            .map(([id_cupon, raiting]) => ({ id_cupon, raiting }))
            .sort((a, b) => {
                const ratingA = parseFloat(a.raiting) || 0; // Default to 0 if NaN
                const ratingB = parseFloat(b.raiting) || 0; // Default to 0 if NaN
                return ratingB - ratingA;
            });*/

        // Convertir a una lista de objetos con el promedio y ordenar por promedio
        const sortedRatings = Object.entries(ratingsByCoupon)
            .map(([id_cupon, { sum, count }]) => ({
                id_cupon,
                raiting: count > 0 ? sum / count : 0
            }))
            .sort((a, b) => b.raiting - a.raiting); // Orden descendente

        console.log('sortedRatings: ', sortedRatings)

        // Obtener los detalles de los cupones
        const cupones = await Promise.all(sortedRatings.map(async ({ id_cupon }) => {
            console.log(id_cupon);
            try {
                let cupon = await getCouponById(id_cupon); // Esperar la promesa correctamente
                console.log('cupon: ', cupon);
                if (cupon && Array.isArray(cupon) && cupon.length > 0) {
                    cupon = cupon[0];
                    return cupon;
                } else {
                    return null;
                }
            } catch (error) {
                console.error('Error obteniendo el cupon:', error);
                return null;
            }
        }));

        // Filtrar cupones nulos o indefinidos
        const cuponesFiltrados = cupones.filter(cupon => cupon !== null);

        return cuponesFiltrados;
    } catch (error) {
        console.error('Error obteniendo los cupones más vendidos:', error);
    }
};

export const getMasPopulares = async () => {
    try {
        const ratings = await getAllRaiting();

        // Agrupar las calificaciones por id_cupon y contar la cantidad de calificaciones
        const ratingsByCoupon = ratings.reduce((acc, rating) => {
            if (rating.id_cupon) {
                acc[rating.id_cupon] = (acc[rating.id_cupon] || 0) + 1;
            }
            return acc;
        }, {});
        /*const ratingsByCoupon = ratings.reduce((acc, rating) => {
            if (acc[rating.id_cupon]) {
                acc[rating.id_cupon] += 1;
            } else {
                acc[rating.id_cupon] = 1;
            }
            return acc;
        }, {});*/

        // Convertir a una lista de objetos y ordenar por número de calificaciones
        const sortedRatings = Object.entries(ratingsByCoupon)
            .map(([id_cupon, count]) => ({ id_cupon, count }))
            .sort((a, b) => b.count - a.count);

        console.log('sortedRatings: ', sortedRatings)

        // Obtener los detalles de los cupones
        const cupones = await Promise.all(sortedRatings.map(async ({ id_cupon }) => {
            try {
                let cupon = await getCouponById(id_cupon);
                if (cupon && cupon.length > 0 && cupon[0]) {
                    return cupon[0];
                }
                return null;
            } catch (error) {
                console.error('Error obteniendo el cupon:', error);
                return null;
            }
        }));

        // Filtrar cupones nulos o indefinidos
        return cupones.filter(cupon => cupon !== null);
    } catch (error) {
        console.error('Error obteniendo los cupones más populares:', error);
        return [];
    }
};

export const getNewCoupons = async () => {
    try {
        const coupons = await getCoupons();
    
        // Filtrar y ordenar cupones
        const validCoupons = coupons
            .filter(coupon => {
                // Validar que createdAt existe y es una fecha válida
                const createdAtDate = new Date(coupon.createdAt);
                return createdAtDate instanceof Date && !isNaN(createdAtDate);
            })
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
        console.log('validCoupons: ', validCoupons)
        return validCoupons;
    } catch (error) {
        console.error("Error fetching and sorting coupons:", error);
        return [];
    }
};

const calculateDiscountedPrice = (price, discount) => {
    return price - ((price * discount)/100);
};

export const getCouponsByPriceDesc = async () => {
    try {
        const allCoupons = await getCoupons();

        // Calcular el precio con descuento y ordenar de mayor a menor
        const sortedCoupons = allCoupons
            .map(coupon => ({
                ...coupon,
                discountedPrice: calculateDiscountedPrice(coupon.price, coupon.discount)
            }))
            .sort((a, b) => b.discountedPrice - a.discountedPrice);

        return sortedCoupons;
    } catch (error) {
        console.error('Error obteniendo los cupones ordenados por precio con descuento (de mayor a menor):', error);
        return [];
    }
};

export const getCouponsByPriceAsc = async () => {
    try {
        const allCoupons = await getCoupons();

        // Calcular el precio con descuento y ordenar de menor a mayor
        const sortedCoupons = allCoupons
            .map(coupon => ({
                ...coupon,
                discountedPrice: calculateDiscountedPrice(coupon.price, coupon.discount)
            }))
            .sort((a, b) => a.discountedPrice - b.discountedPrice);

        return sortedCoupons;
    } catch (error) {
        console.error('Error obteniendo los cupones ordenados por precio con descuento (de menor a mayor):', error);
        return [];
    }
};

export const LikearCupon = async (couponId, likesData) => {
    try {
        console.log('likesData-service: ', likesData); // Verifica que este valor sea 0 o 1
        const response = await fetch(`${API_BASE_URL_CUPONES}/SocialRed/${couponId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(likesData),
        });
        console.log('response.body: ', response.body);
        if (!response.ok) {
            throw new Error('Error al likear el cupon');
        }
        return await response.json();
    } catch (error) {
        console.error('Error al likear el cupon:', error);
        throw error;
    }
}
export const countLikesByCoupon = async (couponId) => {
    try {
        const ratings = await getAllRaiting();
        const compras = [];
        let likeCount = 0;

        for (const rating of ratings) {
            if (String(couponId) == rating.id_cupon) {
                compras.push({ rating });
                if (rating.Like === 1) {
                    likeCount++;
                }
            }
        }

        return { compras, likeCount };
    } catch (error) {
        console.error('Error al contar los likes:', error);
        throw error;
    }
}