import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      credentials.username === "admin1" &&
      credentials.password === "123456"
    ) {
      navigate("/adminDashboard");
    } else if (
      credentials.username === "admin2" &&
      credentials.password === "123456"
    ) {
      navigate("/adminDashboard");
    } else {
      alert("Invalid Credentials");
      setCredentials({
        username: '',
        password: ''
      });
    }

  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1 className="text-center mt-5">Admin Login Page</h1>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: "40vh" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">
              Admin Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              autoComplete="username"
              style={{ backgroundColor: "#e9ecef" }}
              required
              placeholder="admin1 or admin2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="form-control"
              id="password"
              autoComplete="current_password"
              style={{ backgroundColor: "#e9ecef" }}
              required
              placeholder="123456"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/" className="m-3 btn btn-danger">
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
