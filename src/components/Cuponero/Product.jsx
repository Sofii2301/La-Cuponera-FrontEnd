import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Cuponero/slider.css";

export default function Product(props) {
  const navigate = useNavigate();

  const handleClick = () => {
      if (props.type === 'cupon') {
          navigate(`/cuponero/cupones/${props.name}`);
      } else {
          navigate(`/cuponero/tiendas/${props.name}`);
      }
      
  };

  return (
      <div className="card card-categorias" onClick={handleClick}>
          <h2 className="titulo">{props.name}</h2>
          <img className="product--image" src={props.url} alt="product image" />
          <p className="price">{props.price}</p>
          <p>{props.description}</p>
      </div>
  );
}
