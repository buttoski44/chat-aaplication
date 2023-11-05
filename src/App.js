import "./App.css";
import { Register } from "./pages/register/register.page";
import { Login } from "./pages/login/login.page";
import { Home } from "./pages/home/home.page";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as Loader } from "../src/assets/loader.svg";
function App() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const ProtetctedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <div className="App">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/">
            <Route
              index
              element={
                <ProtetctedRoute>
                  <Home />
                </ProtetctedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
