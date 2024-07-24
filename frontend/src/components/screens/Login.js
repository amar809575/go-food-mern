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
      alert('Enter valid credentials!!!');
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
      <h1 className="text-center mt-5">Login Page</h1>
      <div className='container d-flex justify-content-center align-items-center' style={{ height: '40vh' }}>
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
              style={{ backgroundColor: "#e9ecef" }} 
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
              style={{ backgroundColor: "#e9ecef" }} 
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
</div>

        </form>
      </div>
    </div>
  );
};

export default Login;
