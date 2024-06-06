import React from "react";

export default function Plan4({children, currentPlan}) {

    return(
        <>
            <div className={`elementor-element elementor-element-bf6c654 e-con-full e-flex e-con e-child animated fadeInRight flex-item${currentPlan === 'plan4' ? 'current-plan' : ''}`}>
                <div className="elementor-element elementor-element-cd01d5c elementor-widget elementor-widget-image">
                    <div className={`elementor-widget-container container-plan`}>
                        <img
                            loading="lazy"
                            decoding="async"
                            width="563"
                            height="1024"
                            src="https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-563x1024.png"
                            className="img-fluid full-image"
                            alt=""
                            srcSet="https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-563x1024.png 563w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-165x300.png 165w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-768x1398.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-844x1536.png 844w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17-600x1092.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/premium-17.png 915w"
                            sizes="(max-width: 563px) 100vw, 563px"
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}