import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './GoFoodLogo.png'; // Ensure the correct path
import '../App.css';

const Footer = () => {
  return (
    <div className='bg-dark text-light'>
      <div className='container'>
        <footer className="d-flex flex-wrap py-3 border-top">
          <div className="d-flex align-items-center mb-3 mb-md-0">
            <img src={logo} alt='GoFood Logo' style={{ maxWidth: "80px", maxHeight: "80px" }} />
            <Link to="/" className="text-decoration-none lh-1 ms-2">
              <h2 className='text-light fst-italic'>GoFood</h2>
            </Link>
          </div>
          <div className='col-md-8 d-flex justify-content-center align-items-center mb-3 mb-md-0'>
            <span>© 2024 GoFood, Inc</span>
          </div>
          <div className='col-md-4 d-flex justify-content-end align-items-center'>
            <Link to="/adminLogin" className='text-decoration-none text-light'>
              Admin
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
