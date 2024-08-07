import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
      };
  return (
    <>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{ backgroundColor: "#343a40" }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand fs-2 fst-italic" to="/adminDashboard">
              Admin Dashboard
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul
                className="navbar-nav me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
              >
                <li className="nav-item">
                  <Link className="nav-link active fs-5 me-auto" to="/adminDashboard">
                    Home
                  </Link>
                </li>
                
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 me-auto"
                    to="/foodItems"
                  >
                    Food Items
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 me-auto"
                    to="/uploadFoodItems"
                  >
                    Upload Food Items
                  </Link>
                </li>
              </ul>
  
              <div>
                <div
                  className="btn btn-outline-danger mx-2"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            </div>
          </div>
        </nav>
  
    </>
  )
}

export default AdminHeader