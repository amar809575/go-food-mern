import React, { useEffect, useState } from "react";
import AdminHeader from "./AdminHeader";
import "../../App.css";

const AdminDashboard = () => {
  const [userData, setUserData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState({});

  const adminOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/adminOrders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok!!!");
      }

      const data = await response.json();

      setUserData(data.users); // Change 'user' to 'users'
      setOrderData(data.orders);
      
    } catch (error) {
      console.error("Error fetching the data: ", error);
    }
  };

  useEffect(() => {
    adminOrders();
  }, []);

  const handleOrderStatus = (email, orderDate) => {
    setOrderStatuses((prevStatuses) => ({
      ...prevStatuses,
      [email]: {
        ...(prevStatuses[email] || {}),
        [orderDate]: {
          color: "#ffcc00",
          text: "Order Processing",
        },
      },
    }));
  };

  const orderByEmail = orderData.reduce((acc, order) => {
    if (!acc[order.email]) {
      acc[order.email] = [];
    }
    acc[order.email].push(order);
    return acc;
  }, {});

  return (
    <>
      <AdminHeader />
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th>Sl. No.</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((user, userIndex) => (
                <tr key={user.email}>
                  <td>{userIndex + 1}</td>
                  <td>
                    <h4>Name: {user.name}</h4>
                    <p><strong>Email: </strong> {user.email}</p>
                    <p><strong>Location: </strong> {user.location}</p>
                    <br />
                    <hr />
                    {orderByEmail[user.email] && orderByEmail[user.email].length > 0 ? (
                      orderByEmail[user.email].map((order, orderIndex) => (
                        <table className="table table-bordered" key={orderIndex}>
                          <thead>
                            <tr>
                              <th>Order Date</th>
                              <th>Items</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_data.slice().reverse().map((orderData, orderDataIndex) => (
                              <tr key={orderDataIndex}>
                                <td>{orderData[0].Order_date}</td>
                                <td>
                                  <ul>
                                    {orderData.slice(1).map((item) => (
                                      <li key={item.id}>
                                        <strong>{item.name}</strong>: {item.qty} {item.size} - ${item.price}
                                      </li>
                                    ))}
                                  </ul>
                                </td>
                                <td>
                                  <button
                                    className="btn"
                                    style={{
                                      backgroundColor: orderStatuses[user.email]?.[orderData[0].Order_date]?.color || "#339900",
                                    }}
                                    onClick={() => handleOrderStatus(user.email, orderData[0].Order_date)}
                                  >
                                    {orderStatuses[user.email]?.[orderData[0].Order_date]?.text || "Delivered"}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ))
                    ) : (
                      <p>No orders found!!!</p>
                    )}
                  </td>
                  <td></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>Loading user data...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminDashboard;
