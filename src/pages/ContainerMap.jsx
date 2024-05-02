import React from "react";
import Nav from "./Nav";
import Map from "./Map";

import "../App.css"

//<ContainerMap title="" subtitle="" isSignIn="sesion" ></ContainerMap>

function ContainerMap({ title, subtitle, isSignIn, children }) {

  return (
        <>
            <Map/>
            <div className="overlay">
                <Nav isSignIn={isSignIn} />
                <div className="container container-map d-flex justify-content-center align-items-center">
                    <div className="formulario-cmap">
                        <div className="mb-lg-9 mb-5 text-center">
                            <h1 className="mb-1 h2 fw-bold titulo">{title}</h1>
                            <p id="subtitulo">{subtitle}</p>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </>
  );
}

export default ContainerMap;
