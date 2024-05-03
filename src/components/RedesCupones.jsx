import React from "react";

import face from "../assets/face.png";
import insta from "../assets/insta.png";
import wsap from "../assets/wsap.png";

export default function RedesCupones(props) {

    return(
        <>
        <div style={{ display: 'grid', position: 'fixed', top: '35%' }}>
            <img className="face" style={{ margin: '2% 0% 0% -2%' }} src={face} />
            <img className="insta" style={{ margin: '2% 0% 0% -2%' }} src={insta} />
            <img className="wsap" style={{ margin: '2% 0% 0% -2%' }} src={wsap} />
        </div>
        </>
    )
}