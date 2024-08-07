import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import '../../App.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    });
    const json = await response.json();

    if (!json.success) {
      alert('Enter valid credentials!');
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate('/');
    }
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <Header />
      <div className="container d-flex flex-column align-items-center mt-5" style={{ minHeight: '80vh' }}>
        <h1 className="text-center mb-4">Login Page</h1>
        <div className="w-100" style={{ maxWidth: '500px' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                id='email' 
                className="form-control"
                name='email' 
                value={credentials.email}
                onChange={handleChange} 
                autoComplete="on" 
                style={{ backgroundColor: "#f8f9fa" }} 
              />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                name='password'
                value={credentials.password}
                onChange={handleChange}
                className="form-control"
                id="password" 
                style={{ backgroundColor: "#f8f9fa" }} 
              />
            </div>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
              <button type="submit" className="btn btn-success mb-2 mb-md-0">Submit</button>
              <Link to="/createuser" className='btn btn-danger'>I'm a new user</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
