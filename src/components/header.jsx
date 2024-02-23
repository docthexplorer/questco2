import React from "react";
import Heading from "./project-title";
import useLogout from "../hooks/useLogout";
import { Btn } from "./input-field";

export default function NavBar() {
  const logout = useLogout();

  return (
    <div className="d-flex justify-content-between mb-5 header">
      <div>
        <Heading size="3rem" imgH="7rem" imgW="7rem" />
      </div>
      <div>
        <Btn
          class="logout-Btn"
          text={
            <p className="logout">
              Logout{" "}
              <i className="fa-solid fa-arrow-right-from-bracket logout-icon"></i>
            </p>
          }
          onclick={logout}
        />
      </div>
    </div>
  );
}
