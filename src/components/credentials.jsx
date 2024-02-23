import React, { useEffect, useRef, useState } from "react";
import Input, { Submit } from "./input-field";
import { Alert, AlertTitle } from "@mui/material";
import CheckBox from "./check";
import { BeatLoad } from "./ui-loaders";

export default function Credentials({
  action,
  credentials,
  handleAction,
  handleChange,
  userNotUnique,
  userAuthentication,
  regSuccess,
  authExpires,
  togglePersist,
  persist,
  feedback,
}) {
  const inputRef = useRef();
  const [forgetPasswordInfo, setForgetPasswordInfo] = useState(false);

  function hover() {
    setForgetPasswordInfo(true);
  }

  function noHover() {
    setForgetPasswordInfo(false);
  }

  useEffect(() => {
    let isMounted = true;
    isMounted && inputRef.current.focus();
    return () => (isMounted = false);
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center credential-mobile">
      {authExpires && (
        <section className="input-box mb-5">
          <Alert severity="error">
            <AlertTitle>
              <h5>Session Expired</h5>
            </AlertTitle>
            <h6>Please login again to continue...</h6>
          </Alert>
        </section>
      )}
      {regSuccess && (
        <section className="input-box mb-5">
          <Alert severity="success">
            <AlertTitle>
              <h5>User registration successfull!</h5>
            </AlertTitle>
            <h6>Please login to continue...</h6>
          </Alert>
        </section>
      )}
      {userNotUnique.state && (
        <section className="input-box mb-5">
          <Alert severity="warning">
            <h5>{userNotUnique.message}</h5>
          </Alert>
        </section>
      )}
      {userAuthentication.err && (
        <section className="input-box mb-5">
          <Alert severity="error">
            <h5>{userAuthentication.errMessage}</h5>
          </Alert>
        </section>
      )}

      <Input
        type="text"
        text="Username"
        placeholder="Name or nickname"
        label="usernameInput"
        action={handleChange}
        id="usernameInput"
        name="username"
        inputRef={inputRef}
        value={credentials.username}
      />
      <Input
        type="password"
        text="Password"
        label="passwordInput"
        action={handleChange}
        id="passwordInput"
        name="password"
        value={credentials.password}
      />
      <div className="d-flex justify-content-center align-items-center persist-container gap-5">
        <div className="persistLogin">
          <CheckBox
            classname="persistCheck"
            type="checkbox"
            id="persist"
            onchange={togglePersist}
            checked={persist}
          />
          <label htmlFor="persist">Keep me logged in</label>
        </div>
        <div className="forget-password-container">
          <a className="forget-password" href="#">
            <span className="forget-password-info">
              {forgetPasswordInfo && <p>This feature is not yet available.</p>}
              <i
                className="fa-solid fa-circle-info"
                onMouseOver={hover}
                onMouseOut={noHover}
              ></i>
            </span>
            Forgot password?
          </a>
        </div>
      </div>
      <Submit
        text={feedback ? <BeatLoad display="block" /> : action.actionType}
        main="#08605F"
        submit="submit"
      />
      <div className="suggestion fontz">
        <input onClick={handleAction} type="button" value={action.actionHint} />
      </div>
    </div>
  );
}
