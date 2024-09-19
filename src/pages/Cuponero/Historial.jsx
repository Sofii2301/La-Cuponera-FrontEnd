import React, { useEffect, useState } from "react";
import { getCuponeroById } from "../../services/cuponerosService";
import { getAllRaiting, getCouponById, getRaitingByCuponero } from "../../services/CuponesService";
import { useAuth } from '../../context/AuthContext';
import Cuponeros from "../../components/Cuponero/Cuponeros";
import Raiting from '../../components/Raiting'
import ListaCuponesHorizontal from "../../components/Cupones/ListaCuponesHorizontal";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const { authState } = useAuth();
  const cuponeroId = authState.user;

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const userRatings = await getRaitingByCuponero(cuponeroId);
  
        const detailedRatings = await Promise.all(userRatings.map(async (raiting) => {
          let coupon = await getCouponById(raiting.rating.id_cupon);
          if (coupon && coupon.length > 0) {
            coupon = coupon[0];
          } else {
            return null; // Return null if coupon does not exist
          }
          return { ...raiting, coupon };
        }));
        console.log('detailedRatings: ', detailedRatings);
  
        // Filter out null values from detailedRatings
        const validRatings = detailedRatings.filter(rating => rating !== null);
        console.log('validRatings: ', validRatings);

        // Sort the ratings by creation date
        const sortedRatings = validRatings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHistorial(sortedRatings);
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };
  
    fetchHistorial();
  }, [cuponeroId]);
  

  return (
    <Cuponeros>
        <div className="container-fluid p-4">
            <h3>Historial de tus pedidos</h3>
            <div className="table-responsive">
                <table className="table">
                <thead>
                    <tr>
                    <th>Cupon</th>
                    <th>Calificación</th>
                    <th>Comentario</th>
                    <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {historial.map((raiting, index) => (
                    <tr key={index}>
                        <td className="m-2"><ListaCuponesHorizontal listaCupones={[raiting.coupon]}/></td>
                        <td><Raiting couponId={cuponeroId}/></td>
                        <td>{raiting.rating.comentarios}</td>
                        <td>{new Date(raiting.rating.date).toLocaleDateString()}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </Cuponeros>
    
  );
};

export default Historial;
