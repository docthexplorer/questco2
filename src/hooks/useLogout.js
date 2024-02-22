import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get("/logout", {
        withCredentials: true,
      });
      if (response.statusCode === 204) return navigate("/");
    } catch (err) {
      console.error(err);
    } 
    
  }

  return logout;
};

export default useLogout;
