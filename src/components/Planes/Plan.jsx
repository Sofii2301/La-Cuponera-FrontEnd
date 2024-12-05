import React from "react";
import plan1 from "../../assets/Planes/2.png"
import plan2 from "../../assets/Planes/3.png"
import plan3 from "../../assets/Planes/1.png"


const plans = {
    1: {
        src: plan1,
        width: 714,
        height: 1024,
        sizes: "(max-width: 714px) 100vw, 714px"
    },
    2: {
        src: plan2,
        width: 593,
        height: 1024,
        sizes: "(max-width: 593px) 100vw, 593px"
    },
    3: {
        src: plan3,
        width: 544,
        height: 1024,
        sizes: "(max-width: 544px) 100vw, 544px"
    }
};

export default function Plan({ children, plan, currentPlan }) {
    const planData = plans[plan];

    if (!planData) {
        return null; // Retorna null si el plan no es válido
    }

    return (
        <>
            <div className={`elementor-element animated fadeInRight flex-item ${plan === currentPlan ? 'current-plan' : ''}`}>
                <div className={`elementor-element elementor-widget elementor-widget-image`}>
                    <div className="elementor-widget-container container-plan pt-3 pb-3">
                        <img
                            loading="lazy"
                            decoding="async"
                            src={planData.src}
                            className="img-fluid full-image"
                            alt=""
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
