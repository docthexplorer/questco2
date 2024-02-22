import React, { useLayoutEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Submit } from "./input-field";
import NavBar from "./header";
import Welcome from "./welcome";
import useAuth from "../hooks/useAuth";
import PopUpModal from "./modal";

export default function Quests() {
  const { questPath } = useAuth();
  const user = questPath.user;
  const all = questPath.all;
  const navigate = useNavigate();
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname === "/quests") {
      return navigate("user-quests");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="quest-container">
      <NavBar />
      <div className="d-flex flex-column align-items-center">
        <Welcome />
        <div className="d-flex justify-content-center quest-nav mt-5">
          <Link to="user-quests">
            <Submit
              text="my challenges"
              main="#08605F"
              dark="#63474D"
              light="#E5F9E0"
              user={user}
            />
          </Link>
          <Link to="all-quests">
            <Submit
              text="all challenges"
              main="#08605F"
              dark="#63474D"
              light="#E5F9E0"
              all={all}
            />
          </Link>
        </div>


        <Outlet />
      </div>
      <PopUpModal />
    </div>
  );
}
