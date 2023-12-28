import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const userReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          user: action.payload,
        };
        break;
      case "LOGOUT":
        return {
          ...state,
          user: null,
        };
        break;
      default:
        return state;
        break;
    }
  };

  const [state, dispatch] = useReducer(userReducer, {
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
