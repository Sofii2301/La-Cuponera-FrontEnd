import React from "react";
import Nav from "../components/Nav";

export default function NavVendedor(props) {

    return(
        <>
            <Nav isSignIn = "">
                <div className="nav-item dropdown list-inline-item me-5 w-lg-auto dropdown-fullwidth">
                    <a  className="nav-link dropdown-toggle"
                        data-bs-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        aria-controls="collapseExample">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#e4d529"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                        >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </a>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="">
                            <i className="bi bi-person-circle"></i>
                            Perfil
                        </a></li>
                        <li><a className="dropdown-item" href="">
                            <i className="bi bi-arrow-down-circle-fill"></i>
                            Cupones
                        </a></li>
                    </ul>
                </div>

            </Nav>
        </>
    )
}