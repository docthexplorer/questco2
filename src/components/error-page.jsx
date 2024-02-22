import React from "react";
import hiking from "../images/mountain.png";

export default function ErrorPage () {
    return (
        <div className="error-page">
        <h2>Page Not Found</h2>
        <img className="error-img" src={hiking} alt="page not found" />
        </div>
    )
}