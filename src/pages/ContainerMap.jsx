import React from "react";
import Nav from "./Nav";
import Map from "./Map";

//<ContainerMap title="" subtitle="" isSignIn="sesion" ></ContainerMap>

function ContainerMap({ title, subtitle, isSignIn, children }) {

  return (
        <>
            <Map/>
            <div className="overlay">
                <Nav isSignIn={isSignIn} />
                <main>
                    <div className="container-fluid d-flex justify-content-center align-items-center">
                        <div className="fila row justify-content-center align-items-center">
                            <div className="formulario col-11 col-md-8 col-lg-6 mx-auto">
                                <div className="mb-lg-9 mb-5 text-center">
                                    <h1 className="mb-1 h2 fw-bold titulo">{title}</h1>
                                    <p id="subtitulo">{subtitle}</p>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
  );
}

export default ContainerMap;
