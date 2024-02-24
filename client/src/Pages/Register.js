import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style/Auth.scss";
import axios from "axios";
import { baseurl } from "../../config";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${baseurl}/api/v1/users/`, formData)
      .then((response) => response.json)
      .then(() => {
        alert("user created successfully! now login to continue...");
        navigate("/login");
      })
      .catch((error) => alert(error.response.data.username));
  };

  return (
    <div className="container">
      <div className="main__container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <button type="submit">Register</button>
        </form>
        <div
          style={{
            color: "black",
            textAlign: "left",
            margin: "1rem 0",
          }}
        >
          Already have an account? <Link to={"/login"}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
