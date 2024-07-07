import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import logo from './GoFoodLogo.png';

const Footer = () => {
  return (
    <div className='bg-success'>
      <div className='container'>

        <footer className="d-flex flex-wrap py-3 border-top">
          <div className="d-flex align-items-center">
            <img src={logo} alt='GoFoodLogo' style={{ maxWidth: "80px", maxHeight: "80px" }} />
            <Link to="/" className="mb-3 me-2 mb-md-0 text-decoration-none lh-1">
              <h2 className='text-white fst-italic'>GoFood</h2>
            </Link>
          </div>
          <div className='col-md-8 d-flex mt-auto justify-content-center align-items-center'>
            <span className="text-white">© 2024 GoFood, Inc</span>
          </div>
          <div className='d-flex mt-auto justify-content-right align-item-right'>
            <Link className='text-black text-decoration-none' to='/admin'>Admin</Link>
          </div>
        </footer>
      </div>
    </div>

  );
};

export default Footer;
