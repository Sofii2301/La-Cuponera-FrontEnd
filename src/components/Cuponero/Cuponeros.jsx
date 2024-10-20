import NavCuponeros from "./NavCuponeros";
import Footer from "./Footer"

export default function Cuponeros({children, nav = true, footer = true}) {

    return (
        <>
            {nav &&
                <NavCuponeros/>
            }
            <div className="container-cuponeros">
                {children}
            </div>
            {footer &&
                <Footer/>
            }
        </>
    );
}
