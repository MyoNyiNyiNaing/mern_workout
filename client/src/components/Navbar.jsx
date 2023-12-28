import { Link, NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useUserContext } from "../context/UserContext";

const Navbar = () => {
  const { user } = useUserContext();
  const { logout } = useLogout();
  const handleClick = async () => {
    logout();
  };
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Workout Buddy</h1>
        </Link>
        <nav>
          {user ? (
            <div>
              <span>{user?.email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          ) : (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
