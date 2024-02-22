import "./skeleton.css";

export default function Skeleton() {
    return(
        <div className="tile d-flex flex-column justify-content-around gap-5 align-items-center animate-pulse">
            <div className="skeleton animate-pulse heading width-50"></div>
            <div className="skeleton animate-pulse icon"></div>
            <div className="empty"></div>
            <div className="skeleton animate-pulse button width-80"></div>
        </div>
    )

}
