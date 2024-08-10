import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import "../../App.css";

function MyOrder() {
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data && data.order_data) {
        setOrderData(data.order_data);
      } else {
        setOrderData([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/myUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data && data.user_data) {
        setUserData(data.user_data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  useEffect(() => {
    fetchMyUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!Array.isArray(orderData) || orderData.length === 0) {
    return <div>No orders found</div>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <hr />
        <h2>My Profile</h2><hr />
        <div className="mb-5">
          {userData && (
            <div className="py-3">
              <h2>
                <strong>Name: </strong>
                {userData.name}
              </h2>
              <p><strong>Email: </strong>{userData.email}</p>
              <p><strong>Location: </strong>{userData.location}</p>
            </div>
          )}
        </div>
        <div className="row">
          {orderData
            .slice()
            .reverse()
            .map((orderGroup, index) => (
              <div key={index}>
                <div className="m-auto mt-5">
                  <hr />
                  <h4>Order Date: {orderGroup[0].Order_date}</h4>
                  <hr />
                </div>
                <div className="row">
                  {orderGroup.slice(1).map((item, itemIndex) => (
                    <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                      <div
                        className="card mt-3"
                        style={{ width: "16rem", maxHeight: "360px" }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{item.name}</h5>
                          <div
                            className="container w-100 p-0"
                            style={{ height: "38px" }}
                          >
                            <span className="m-1">Qty: {item.qty}</span>
                            <span className="m-1">Size: {item.size}</span>
                            <div className="d-inline ms-2 h-100 w-20 fs-5">
                              &#8377;{item.price}/-
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyOrder;
