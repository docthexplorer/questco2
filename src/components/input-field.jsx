import React, { useState } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Input(props) {
  const [revealPassword, setRevealPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };

  return (
    <div className="d-flex justify-content-center input-group mb-5 input-box">
      <span
        className="d-flex justify-content-center input-group-text input-label"
        id={props.id}
      >
        {props.text}
      </span>
      <div className="d-flex input-container">
        <input
          id={props.id}
          type={revealPassword ? "text" : props.type}
          placeholder={props.placeholder}
          className="form-control input-detail"
          name={props.name}
          onChange={props.action}
          value={props.value}
          aria-describedby="basic-addon1"
          autoComplete="off"
          ref={props.inputRef}
          required
        />
        {props.name === "password" && (
          <label
            htmlFor={props.id}
            onClick={togglePassword}
            className="password-reveal"
          >
            <i
              className={
                !revealPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
              }
            ></i>
          </label>
        )}
      </div>
    </div>
  );
}

function Btn(props) {
  return (
    <button className={props.class} type="button" onClick={props.onclick}>
      {props.text}
    </button>
  );
}

function Submit(props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: props.main,
      },
    },
  });

  const customStyle = {
    backgroundColor: props.dark,
    color: props.light,
  };

  const [isMouseOver, setMouseOver] = useState(false);

  function hover() {
    setMouseOver(true);
    theme.palette.primary.main = customStyle.color;
  }

  function noHover() {
    setMouseOver(false);
    theme.palette.primary.main = props.main;
  }

  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="outlined"
        style={isMouseOver || props.all || props.user ? customStyle : null}
        onMouseOver={hover}
        onMouseOut={noHover}
        type={props.submit}
      >
        <span className="button-text">{props.text}</span>
      </Button>
    </ThemeProvider>
  );
}

export default Input;
export { Submit, Btn };
