import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header';

function Signup() {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        geolocation: ''
    });

const history = useNavigate(); //for redirecting 
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation,
            })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            alert('User Registered successfully');
            history('/login');
        }

        if (!json.success) {
            alert('Enter valid credentials!!!');
        }
    }

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
        <Header />
            <div className='container'>


                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" id='name' name='name' value={credentials.name}
                            onChange={handleChange} className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" id='email' className="form-control"
                            name='email' value={credentials.email}
                            onChange={handleChange} />
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
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" id='address' name='geolocation' value={credentials.geolocation}
                            onChange={handleChange} className="form-control"
                        />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}

export default Signup