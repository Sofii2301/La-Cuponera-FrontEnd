import React from "react";

export default function Plan1({children, currentPlan}) {

    return(
        <>
            <div className={`elementor-element elementor-element-0dd508c e-con-full e-flex e-con e-child animated fadeInRight flex-item ${currentPlan === 'plan1' ? 'current-plan' : ''}`}>
                <div className="elementor-element elementor-element-95cef87 elementor-widget elementor-widget-image">
                    <div className={`elementor-widget-container`}>
                        <img
                            loading="lazy"
                            decoding="async"
                            width="714"
                            height="1024"
                            src="https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-714x1024.png"
                            className="img-fluid full-image"
                            alt=""
                            srcSet="https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-714x1024.png 714w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-209x300.png 209w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-768x1101.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06-600x860.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/Sin-titulo-1-06-06.png 880w"
                            sizes="(max-width: 714px) 100vw, 714px"
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}