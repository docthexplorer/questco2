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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
