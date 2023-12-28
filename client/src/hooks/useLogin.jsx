import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useUserContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/user/login",
        { email, password }
      );
      if (data.success) {
        const { email, token } = data;
        // save the user to local storage
      
        localStorage.setItem("user", JSON.stringify({ email, token }));
        // update the auth context
        dispatch({ type: "LOGIN", payload: { email, token } });
        setIsLoading(false);
      }
    } catch (error) {
     
      if (error.response.status === 400) {
        setIsLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  return { login, isLoading, error };
};
