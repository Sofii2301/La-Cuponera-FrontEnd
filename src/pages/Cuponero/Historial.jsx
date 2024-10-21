import React, { useEffect, useState } from "react";
import { getCouponById, getRaitingByCuponero } from "../../services/CuponesService";
import { useAuth } from '../../context/AuthContext';
import Pagination from '../../components/Pagination'

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const { authState } = useAuth();
  const cuponeroId = authState.user;

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
          const userRatings = await getRaitingByCuponero(cuponeroId);
          const detailedRatings = await Promise.all(userRatings.map(async (raiting) => {
            if (!(raiting.rating.date)) {
              return null;
            }
            let coupon = await getCouponById(raiting.rating.id_cupon);
            if (coupon && coupon.length > 0) {
              coupon = coupon[0];
            } else {
              return null; // Return null if coupon does not exist
            }
            return { ...raiting, coupon };
          }));
    
          // Filter out null values from detailedRatings
          const validRatings = detailedRatings.filter(rating => rating !== null);

          // Sort the ratings by creation date
          const sortedRatings = validRatings
              .filter(validRatings => {
                  // Validar que createdAt existe y es una fecha válida
                  const createdAt = new Date(validRatings.rating.date);
                  return createdAt instanceof Date && !isNaN(createdAt);
              })
              .sort((a, b) => new Date(b.rating.date) - new Date(a.rating.date));
          setHistorial(sortedRatings);
      } catch (error) {
          console.error("Error fetching historial:", error);
      }
    };
  
    fetchHistorial();
  }, [cuponeroId]);
  

  return (
      <div className="container-fluid p-4">
          <h3>Historial de tus pedidos</h3>
          <Pagination items={historial} itemsPerPage={10} itemType='historial' />
      </div>
  );
};

export default Historial;
