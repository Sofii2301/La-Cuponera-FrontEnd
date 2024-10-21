import Raiting from '../Raiting'
import ListaCuponesHorizontal from '../Cupones/ListaCuponesHorizontal'

const ListaHistorial = ({listaHistorial}) => {
    return (
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
                {listaHistorial.map((raiting, index) => (
                <tr key={index}>
                    <td className="m-2"><ListaCuponesHorizontal listaCupones={[raiting.coupon]}/></td>
                    <td><Raiting couponId={raiting.coupon.id}/></td>
                    <td>{raiting.rating.comentarios}</td>
                    <td>{new Date(raiting.rating.date).toLocaleDateString()}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default ListaHistorial;