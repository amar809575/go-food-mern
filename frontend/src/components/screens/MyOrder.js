import React, { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import '../../App.css';

function MyOrder() {
  const [orderData, setOrderData] = useState([]);

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

      const data = await response.json();
      setOrderData(data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          {orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div key={index}>
                {order.orderData ? (
                  order.orderData.order_data
                    .slice(0)
                    .reverse()
                    .map((items, idx) => (
                      <div key={idx}>
                        <div className="m-auto mt-5">
                          <hr />
                          <h4>Order Date: {items[0].Order_date}</h4>
                          <hr />
                        </div>
                        <div className="row">
                          {items.map((arrayData, itemIndex) => (
                            <div className="col-12 col-md-6 col-lg-3" key={itemIndex}>
                              <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                <img src={arrayData.img} className="card-img-top" alt={arrayData.name} />
                                <div className="card-body">
                                  <h5 className="card-title">{arrayData.name}</h5>
                                  <div className="container w-100 p-0" style={{ height: "38px" }}>
                                    <span className="m-1">Qty: {arrayData.qty}</span>
                                    <span className="m-1">Size: {arrayData.size}</span>
                                    <div className="d-inline ms-2 h-100 w-20 fs-5">
                                      &#8377;{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                ) : (
                  <div>No order data available</div>
                )}
              </div>
            ))
          ) : (
            <div>No orders found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyOrder;
