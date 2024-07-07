import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";

const Login = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({

        email: '',
        password: ''

    })

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
        }

        if (json.success) {
            // console.log("Auth token:", json.authToken); 
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
            <h1>Login Page</h1>
            <div className='container'>


                <form onSubmit={handleSubmit}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id='email' className="form-control"
                            name='email' value={credentials.email}
                            onChange={handleChange} autoComplete="on" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" name='password'
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-control"
                            id="password" />
                    </div>


                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;