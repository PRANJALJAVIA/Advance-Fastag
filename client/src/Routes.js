import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ProtectedRoute from "./context/ProtectedRoute";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Error404 from "./Pages/Error404";
import { AuthProvider } from "./context/AuthContext";
import AddPlace from "./Pages/AddPlace";
import FindPlace from "./Pages/FindPlace";

const ProjectRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/sign-up" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login />} />
          <Route
            path="/add-place"
            element={
              <ProtectedRoute>
                <AddPlace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/find-place"
            element={
              <ProtectedRoute>
                <FindPlace />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" exact element={<Login />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default ProjectRoutes;
