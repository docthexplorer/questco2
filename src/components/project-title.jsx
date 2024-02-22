import React from "react";
import Img_lgo from "../images/carbon.png"


export default function Heading(props) {
    return (
        <div className="d-flex justify-content-center align-items-center carbon-quest" >
        <img  className="cloud" src={Img_lgo} alt="cloud" style={{height: props.imgH, width: props.imgW}} />
        <h1 className="carbon-hidden-mobile" style={{fontSize: props.size}}>Carbon Quest</h1>
        </div>
    )
}