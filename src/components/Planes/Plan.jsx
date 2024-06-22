import React from "react";
import plan1 from "../../assets/Planes/Plan_Basic.png"


const plans = {
    plan1: {
        src: plan1,
        width: 714,
        height: 1024,
        sizes: "(max-width: 714px) 100vw, 714px"
    },
    plan2: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-593x1024.png",
        width: 593,
        height: 1024,
        sizes: "(max-width: 593px) 100vw, 593px"
    },
    plan3: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-544x1024.png",
        width: 544,
        height: 1024,
        sizes: "(max-width: 544px) 100vw, 544px"
    },
    plan4: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-563x1024.png",
        width: 563,
        height: 1024,
        sizes: "(max-width: 563px) 100vw, 563px"
    }
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
