import { useUserContext } from "../context/UserContext";

export const useLogout = () => {
  const { dispatch } = useUserContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
