import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Auth.scss";
import axios from "axios";
import { baseurl } from "../config";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
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
      .post(`${baseurl}/api/user/register`, formData)
      .then((response) => response.json)
      .then(() => {
        alert("user created successfully! now login to continue...");
        navigate("/sign-in");
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
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />

          <br />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />

          <br />
          <input
            type="text"
            name="email"
            placeholder="Enter Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <br />
          <input
            type="text"
            name="mobile"
            placeholder="Enter mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />

          <br />

          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
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
          Already have an account? <Link to={"/sign-in"}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
