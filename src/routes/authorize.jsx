import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Heading from "../components/project-title";
import Credentials from "../components/credentials";
import { Footer } from "../components/footer";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useErrorBoundary } from "react-error-boundary";

function Authorize() {
  const [feedback, setFeedback] = useState(false);
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "quests";
  const { setAuth, authExpires, setAuthExpires, persist, setPersist } =
    useAuth();

  // Authorization state with options to register or login
  const [userNotUnique, setUserNotUnique] = useState({
    state: false,
    message: "",
  });
  const [userAuthentication, setUserAuthentication] = useState({
    err: false,
    errMessage: "",
  });

  const [action, setAction] = useState({
    actionType: "login",
    actionHint: "don't have an account yet?",
  });

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [regSuccess, setRegSuccess] = useState(false);

  //effect to fetch users uniqueness
  useEffect(() => {
    switch (action.actionType) {
      case "register":
        axios
          .get(`/register/${credentials.username}`)
          .then((inputCheck) => {
            if (inputCheck?.status === 205) {
              console.log(inputCheck);
              setUserNotUnique((prev) => {
                return {
                  ...prev,
                  state: true,
                  message: "Username already exist!",
                };
              });
            } else {
              setUserNotUnique((prev) => {
                return {
                  ...prev,
                  state: false,
                  message: "",
                };
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case "login":
        setUserNotUnique((prev) => {
          return {
            ...prev,
            state: false,
            message: "",
          };
        });
        break;
      default:
        console.log();
    }
  }, [credentials.username, action.actionType]);

  // functions to handle authorization states
  function handleAction() {
    action.actionType === "login"
      ? setAction({
          actionType: "register",
          actionHint: "already have an account?",
        })
      : setAction({
          actionType: "login",
          actionHint: "don't have an account yet?",
        });
  }

  function handleChange(event) {
    setUserAuthentication((prev) => {
      return {
        ...prev,
        err: false,
        errMessage: "",
      };
    });
    setRegSuccess(false);
    const { name, value } = event.target;
    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  //function to handle form submission
  const handleFormSubmit = async function (e) {
    e.preventDefault();
    setFeedback(true);

    try {
      const response = await axios.post(
        `/${action.actionType}`,
        { username: credentials.username, password: credentials.password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      switch (action.actionType) {
        case "register":
          if (response?.status === 201) {
            setCredentials((prev) => {
              return {
                ...prev,
                password: "",
              };
            });
            setAction({
              actionType: "login",
              actionHint: "don't have an account yet?",
            });
            setFeedback(false);
            setRegSuccess(true);
          }
          break;
        case "login":
          if (response?.data) {
            const accessToken = response?.data?.accessToken;
            setCredentials({
              username: "",
              password: "",
            });
            setFeedback(false);
            setAuth({ accessToken });
            setAuthExpires(false);
            navigate(from);
          }
          break;
        default:
          console.log();
      }
    } catch (err) {
      setFeedback(false);
      if (!err.response) {
        showBoundary({ message: "No server response" });
      } else if (err.name === "Network Error") {
        showBoundary(err);
      } else if (err?.response.status === 406) {
        setUserAuthentication({
          err: true,
          errMessage: "User authentication failed. Please try again.",
        });
      } else if (err?.response.status === 400) {
        setUserAuthentication({
          err: true,
          errMessage: "Username and Password are required",
        });
      } else if (err?.response.status === 404) {
        setUserAuthentication({
          err: true,
          errMessage: "Access denied. User not found.",
        });
      } else if (err?.response.status === 401) {
        setUserAuthentication({
          err: true,
          errMessage: "Unauthorize request. Please enter a correct password.",
        });
      }
    }
  };

  // function to set user persistent login session.
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <div className="fluid-container">
        <Heading />
        <form className="auth d-flex flex-column" onSubmit={handleFormSubmit}>
          <h2 className="login-heading">Login to Carbon Quest App.</h2>
          <Credentials
            action={action}
            credentials={credentials}
            handleAction={handleAction}
            handleChange={handleChange}
            userNotUnique={userNotUnique}
            userAuthentication={userAuthentication}
            regSuccess={regSuccess}
            authExpires={authExpires}
            togglePersist={togglePersist}
            persist={persist}
            feedback={feedback}
          />
        </form>
        <Footer />
      </div>
    </>
  );
}

export default Authorize;
