import React from "react";
import hiking from "../images/hiking.png";

export default function ErrorFallback({ error }) {
  console.log(error);
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <img className="error-img" src={hiking} alt="error boundary" />
      <pre className="fontz">
        {error.message}
      </pre>
    </div>
  );
}
