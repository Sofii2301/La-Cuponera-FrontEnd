import React from "react";
import "../../css/Cuponero/slider.css"

export default function Product(props) {
  return (
    <div className="card">
      <h2 className=" titulo">{props.name}</h2>
      <img className="product--image" src={props.url} alt="product image" />
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      
    </div>
  );
}
