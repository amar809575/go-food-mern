import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Badge from 'react-bootstrap/Badge';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from './screens/Cart';
import { useCart } from './ContextReducer';
import logo from './GoFoodLogo.png';
import '../App.css';

const Header = () => {

  let data = useCart();

  const [cartView, setCartView] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#343a40' }}>
      <div className="container-fluid">
        <img src={logo} alt='GoFoodLogo' style={{ maxWidth: "45px", maxHeight: "45px" }} />
        <Link className="navbar-brand fs-2 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul className="navbar-nav me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }}>
            <li className="nav-item">
              <Link className="nav-link active fs-5 me-auto" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") ?
              <li className="nav-item">
                <Link className="nav-link active fs-5 me-auto" to="/myOrder">My Orders</Link>
              </li>
              : ""}
          </ul>
          {!localStorage.getItem("authToken") ?
            <div className="navbar-nav ml-auto">
              <Link className="btn btn-outline-success mx-1" to="/login">Login</Link>
              <Link className="btn btn-outline-success mx-1" to="/createuser">Signup</Link>
            </div>
            :
            <div>
              <div className='btn btn-outline-light mx-2' onClick={() => { setCartView(true) }}>
                My Cart {" "}
                <Badge pill bg='danger' >{data.length}</Badge>
              </div>
              {cartView ? <Modal onClose={() => { setCartView(false) }} ><Cart /></Modal> : null}
              <div className='btn btn-outline-danger mx-2' onClick={handleLogout}>Logout</div>
            </div>
          }
        </div>
      </div>
    </nav>
  );
};

export default Header;
