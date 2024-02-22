import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRefreshToken from "../hooks/useRefreshToken";
import {MoonSpinner } from "../components/ui-loaders";


const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="d-flex justify-content-center align-items-center circular-progress-frame">
          <MoonSpinner />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
