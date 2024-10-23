import React from "react";
import { Link } from "react-router-dom";
import face from "../assets/face.png";
import insta from "../assets/insta.png";
import wsap from "../assets/wsap.png";

export default function RedesCupones(props) {

    return(
        <>
        <div className="cont-redes-cupones">
            <Link to="https://www.facebook.com/lacuponera.col/" target='_blank'><img className="face" src={face} /></Link>
            <Link to="https://www.instagram.com/lacuponera.colombia/?next=%2F" target='_blank'><img className="insta" src={insta} /></Link>
            <Link to="https://wa.link/sfcqjr" target='_blank'><img className="wsap" src={wsap} /></Link>
        </div>
        </>
    )
}