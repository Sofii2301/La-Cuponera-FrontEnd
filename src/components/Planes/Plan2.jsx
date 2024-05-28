import React from "react";

export default function Plan2({children, currentPlan}) {

    return(
        <>
            <div className={`elementor-element elementor-element-04292ac e-con-full e-flex e-con e-child animated fadeInRight flex-item ${currentPlan === 'plan2' ? 'current-plan' : ''}`}>
                <div className="elementor-element elementor-element-400d214 elementor-widget elementor-widget-image">
                    <div className={`elementor-widget-container`}>
                        <img
                            loading="lazy"
                            decoding="async"
                            width="593"
                            height="1024"
                            src="https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-593x1024.png"
                            className="img-fluid full-image"
                            alt=""
                            srcSet="https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-593x1024.png 593w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-174x300.png 174w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-768x1327.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09-600x1036.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/tienda-online-09.png 840w"
                            sizes="(max-width: 593px) 100vw, 593px"
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}