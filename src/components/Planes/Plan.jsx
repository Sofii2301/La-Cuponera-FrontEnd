import React from "react";

const plans = {
    plan1: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-714x1024.png",
        width: 714,
        height: 1024,
        srcSet: "https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-714x1024.png 714w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-209x300.png 209w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-768x1101.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-600x860.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06.png 880w",
        sizes: "(max-width: 714px) 100vw, 714px"
    },
    plan2: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-593x1024.png",
        width: 593,
        height: 1024,
        srcSet: "https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-593x1024.png 593w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-174x300.png 174w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-768x1327.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-600x1036.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09.png 840w",
        sizes: "(max-width: 593px) 100vw, 593px"
    },
    plan3: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-544x1024.png",
        width: 544,
        height: 1024,
        srcSet: "https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-544x1024.png 544w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-159x300.png 159w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-768x1446.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-816x1536.png 816w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-600x1129.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15.png 909w",
        sizes: "(max-width: 544px) 100vw, 544px"
    },
    plan4: {
        src: "https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-563x1024.png",
        width: 563,
        height: 1024,
        srcSet: "https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-563x1024.png 563w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-165x300.png 165w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-768x1398.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-844x1536.png 844w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-600x1092.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17.png 915w",
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
                    <div className="elementor-widget-container container-plan">
                        <img
                            loading="lazy"
                            decoding="async"
                            width={planData.width}
                            height={planData.height}
                            src={planData.src}
                            className="img-fluid full-image"
                            alt=""
                            srcSet={planData.srcSet}
                            sizes={planData.sizes}
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    );
}
