import React from "react";

export default function Plan3({children, currentPlan}) {

    return(
        <>
            <div className={`elementor-element elementor-element-c5a1e23 e-con-full e-flex e-con e-child animated fadeInRight flex-item ${currentPlan === 'plan3' ? 'current-plan' : ''}`}>
                <div className="elementor-element elementor-element-693118e elementor-widget elementor-widget-image">
                    <div className={`elementor-widget-container container-plan`}>
                        <img
                            loading="lazy"
                            decoding="async"
                            width="544"
                            height="1024"
                            src="https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-544x1024.png"
                            className="img-fluid full-image"
                            alt=""
                            srcSet="https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-544x1024.png 544w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-159x300.png 159w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-768x1446.png 768w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-816x1536.png 816w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15-600x1129.png 600w, https://lacuponera.digital/wp-content/uploads/2024/04/certificada-15.png 909w"
                            sizes="(max-width: 544px) 100vw, 544px"
                        />
                    </div>
                </div>
                {children}
            </div>
        </>
    )
}