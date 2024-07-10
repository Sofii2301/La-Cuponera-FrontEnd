import React, { useEffect, useState } from "react";
import { getCuponeroById } from "../../services/cuponerosService";
import { getAllRaiting, getCouponById } from "../../services/CuponesService";
import { useAuth } from '../../services/AuthContext';
import Cuponeros from "../../components/Cuponero/Cuponeros";

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const { authState } = useAuth();
  const cuponeroId = authState.user;

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const allRaiting = await getAllRaiting();
        const userRatings = allRaiting.filter(raiting => raiting.user_id === cuponeroId);

        const detailedRatings = await Promise.all(userRatings.map(async (raiting) => {
          const coupon = await getCouponById(raiting.id_cupon);
          return { ...raiting, coupon };
        }));

        const sortedRatings = detailedRatings.sort((a, b) => new Date(b.date) - new Date(a.date));
        setHistorial(sortedRatings);
      } catch (error) {
        console.error("Error fetching historial:", error);
      }
    };

    fetchHistorial();
  }, [cuponeroId]);

  return (
    <Cuponeros>
        <div className="container mt-3">
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
                        <td>{raiting.coupon.title}</td>
                        <td>{raiting.raiting}</td>
                        <td>{raiting.comentarios}</td>
                        <td>{new Date(raiting.date).toLocaleDateString()}</td>
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
