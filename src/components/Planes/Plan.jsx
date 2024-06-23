import React from "react";
import plan1 from "../../assets/Planes/Plan_Basic.png"
import plan2 from "../../assets/Planes/Plan_Gold.png"
import plan3 from "../../assets/Planes/Plan_Premium.png"
import plan4 from "../../assets/Planes/Marcayredes.png"
import plan5 from "../../assets/Planes/Fotoyvideo.png"
import plan6 from "../../assets/Planes/Traficopago.png"


const plans = {
    plan1: {
        src: plan1,
        width: 714,
        height: 1024,
        sizes: "(max-width: 714px) 100vw, 714px"
    },
    plan2: {
        src: plan2,
        width: 593,
        height: 1024,
        sizes: "(max-width: 593px) 100vw, 593px"
    },
    plan3: {
        src: plan3,
        width: 544,
        height: 1024,
        sizes: "(max-width: 544px) 100vw, 544px"
    },
    plan4: {
        src: plan4,
        width: 714,
        height: 1024,
        sizes: "(max-width: 714px) 100vw, 714px"
    },
    plan5: {
        src: plan5,
        width: 593,
        height: 1024,
        sizes: "(max-width: 593px) 100vw, 593px"
    },
    plan6: {
        src: plan6,
        width: 544,
        height: 1024,
        sizes: "(max-width: 544px) 100vw, 544px"
    },
};

export default function Plan({ children, plan, currentPlan }) {
    const planData = plans[plan];

    if (!planData) {
        return null; // Retorna null si el plan no es válido
    }

    return (
        <>
            <div className={`elementor-element e-con-full e-flex e-con e-child animated fadeInRight flex-item ${plan === currentPlan ? 'current-plan' : ''}`}>
                <div className={`elementor-element elementor-widget elementor-widget-image`}>
                    <div className="elementor-widget-container container-plan pt-3 pb-3">
                        <img
                            loading="lazy"
                            decoding="async"
                            width={planData.width}
                            height={planData.height}
                            src={planData.src}
                            className="img-fluid full-image"
                            alt=""
                            sizes={planData.sizes}
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
