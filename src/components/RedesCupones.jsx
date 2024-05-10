import React from "react";
import { Link } from "react-router-dom";
import face from "../assets/face.png";
import insta from "../assets/insta.png";
import wsap from "../assets/wsap.png";

export default function RedesCupones(props) {

    return(
        <>
        <div className="cont-redes-cupones">
            <Link to="https://www.facebook.com/lacuponera.col/"><img className="face" src={face} /></Link>
            <Link to="https://www.instagram.com/lacuponera.colombia/?next=%2F"><img className="insta" src={insta} /></Link>
            <Link to=""><img className="wsap" src={wsap} /></Link>
        </div>
        </>
    )
}