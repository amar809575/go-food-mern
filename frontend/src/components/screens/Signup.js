import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import "../../App.css";

function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });

      const json = await response.json();
      console.log(json);

      if (json.success) {
        alert("User Registered successfully");
        navigate("/login");
      } else {
        alert("Enter valid credentials!!!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Header />
<<<<<<< HEAD
      <div className="container d-flex flex-column align-items-center mt-5" style={{ minHeight: '80vh' }}>
        <h1 className="text-center mb-4">Sign Up</h1>
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
=======
      <div className="container">
        <h1 className="text-center mt-4 mb-4">Sign Up</h1>
        <div
          className="container d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
>>>>>>> origin/master
              <input
                type="text"
                id="name"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                className="form-control"
<<<<<<< HEAD
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
=======
                style={{ backgroundColor: "#e9ecef" }} 
                />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
>>>>>>> origin/master
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={credentials.email}
                onChange={handleChange}
<<<<<<< HEAD
                style={{ backgroundColor: "#f8f9fa" }}
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
=======
                style={{ backgroundColor: "#e9ecef" }} 
                />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
>>>>>>> origin/master
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="form-control"
<<<<<<< HEAD
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="geolocation" className="form-label">Address</label>
              <textarea
=======
                style={{ backgroundColor: "#e9ecef" }} 
                />
            </div>
            <div className="mb-3">
              <label htmlFor="geolocation" className="form-label">
                Address
              </label>
              <textarea
                type="text"
>>>>>>> origin/master
                id="geolocation"
                name="geolocation"
                value={credentials.geolocation}
                onChange={handleChange}
                className="form-control"
<<<<<<< HEAD
                style={{ backgroundColor: "#f8f9fa" }}
              />
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <button type="submit" className="btn btn-success mb-2 mb-md-0">Submit</button>
              <Link to="/login" className="btn btn-danger">Already a User</Link>
            </div>
=======
                style={{ backgroundColor: "#e9ecef" }} 
                />
            </div>
            <button type="submit" className="m-3 btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a User
            </Link>
>>>>>>> origin/master
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
