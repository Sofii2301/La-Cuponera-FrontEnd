import React from "react";
import Nav from "../components/Nav";

export default function NavCuponeros(props) {

    return(
        <>
            <Nav isSignIn = "">
                {/* Buscador */}
                <div class="col-xxl-5 col-lg-5 d-none d-lg-block">
                    <form action="#">
                        <div class="input-group">
                            <input class="form-control rounded-0 rounded-start" type="search" placeholder="Encontrá nuevos productos" />
                            <span class="input-group-append">
                                <button class="btn bg-white border border-start-0 ms-n10 rounded-0 rounded-end" type="button">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-search"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
                {/* Ubicacion */}
                <div class="col-md-2 col-xxl-3 d-none d-lg-block">
                    {/* Button trigger modal */}
                    <button  type="button" class="btn btn-outline-gray-400 text-muted" id="icon-pin-button" data-bs-toggle="modal" data-bs-target="#locationModal">
                        <i class="bi bi-geo-alt-fill icon-pin"></i>
                        <a id="ciudad" ></a>
                    </button>
                </div>
            </Nav>
        </>
    )
}
