import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './GoFoodLogo.png';
import '../App.css';

const Footer = () => {
  return (
    <div className='bg-dark text-light'>
      <div className='container'>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 border-top">
          <div className="d-flex align-items-center">
            <img src={logo} alt='GoFood Logo' style={{ maxWidth: "80px", maxHeight: "80px" }} />
            <Link to="/" className="text-decoration-none lh-1 ms-2">
              <h2 className='text-light fst-italic'>GoFood</h2>
            </Link>
          </div>

          <div className='d-flex justify-content-center'>
            <span>© 2024 GoFood, Inc</span>
          </div>

          <div className='d-flex justify-content-end'>
            <Link to="/adminLogin" className='text-decoration-none text-dark'>
              Admin
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
