import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  let { user } = useContext(AuthContext);

  return !user ? <Navigate to="/sign-in" /> : children;
};

export default ProtectedRoute;