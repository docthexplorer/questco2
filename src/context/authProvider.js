import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [authExpires, setAuthExpires] = useState(false);
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [questAccord, setQuestAccord] = useState(false);
  const [questPath, setQuestPath] = useState({
    all: false,
    user: false,
  });
  const iconStyle = {
    "--fa-primary-color": "#08605F",
    "--fa-secondary-color": "#94B08A"
  };

  const crownStyle = {
    "--fa-primary-color": "#E09F3E",
    "--fa-secondary-color": "#63474D",
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authExpires,
        setAuthExpires,
        persist,
        questAccord,
        setQuestAccord,
        setPersist,
        questPath,
        setQuestPath,
        iconStyle,
        crownStyle 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
