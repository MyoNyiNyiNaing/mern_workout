import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import WorkoutCreateForm from "./components/WorkoutCreateForm";
import WorkoutEditForm from "./components/WorkoutEditForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useUserContext } from "./context/UserContext";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
    }
  }, [user]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to={"/login"} />}
            >
              <Route index element={<WorkoutCreateForm />} />
              <Route path="/edit/:id" element={<WorkoutEditForm />} />
            </Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/register"
              element={!user ? <Register /> : <Navigate to={"/"} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
