import React from "react";


export function Footer () {
    const updateYear = new Date();

    return(
        <div className="d-flex flex-column justify-content-center align-items-center gap-3 footer">
            <p>© {updateYear.getUTCFullYear()}-Carbon Quest</p>
            <p>A gamified app that helps create awareness about the small changes that can benefit the climate.</p>
        </div>
    )
}