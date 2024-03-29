import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../style/Auth.scss";
import AuthContext from "../context/AuthContext";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

//   useEffect(() => {
//     logoutUser();
//   }, [logoutUser]);

  return (
    <div className="container">
      <div className="main__container">
        <h1>Welcome</h1>
        <form onSubmit={loginUser}>
          <input type="email" name="email" placeholder="Email" required />

          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <div
          style={{
            color: "black",
            textAlign: "left",
            margin: "1rem 0",
          }}
        >
          Dont have account? <Link to={"/sign-up"}>Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;