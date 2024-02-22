import React, { useState } from "react";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Input(props) {
  const [revealPassword, setRevealPassword] = useState(false);
  // const [inputType, setInputType] = useState(props.type);

  const togglePassword = (e) => {
    e.preventDefault();
    setRevealPassword((prev) => !prev);
  };


  return (
    <div className="d-flex input-group mb-5 input-box">
      <span className="input-group-text input-label fontz" id={props.id}>
        {props.name}
      </span>
      <div className="d-flex password-container">
        <input
          type={revealPassword ? "text" : props.type}
          placeholder={props.placeholder}
          className="form-control input-detail fontz"
          name={props.name}
          onChange={props.action}
          value={props.value}
          aria-describedby="basic-addon1"
          autoComplete="off"
          ref={props.inputRef}
          required
        />
        {props.name === "password" && (
          <label htmlFor={props.name}
            onClick={togglePassword}
            className="password-reveal"
          >
            <i
              className={
                !revealPassword
                  ? "fa-duotone fa-eye"
                  : "fa-duotone fa-eye-slash"
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
        <span className="button-text fontz">{props.text}</span>
      </Button>
    </ThemeProvider>
  );
}

export default Input;
export { Submit, Btn };
