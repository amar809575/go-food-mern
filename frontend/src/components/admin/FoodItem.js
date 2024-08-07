import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditForm from "./EditForm";
import AdminHeader from "./AdminHeader";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FoodItem = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      console.log(responseData);
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const groupedFoodItems = foodItem.reduce((acc, item) => {
    if (!acc[item.CategoryName]) {
      acc[item.CategoryName] = [];
    }
    acc[item.CategoryName].push(item);
    return acc;
  }, {});

  const handleEdit = (item) => {
    console.log("Edit item: ", item);
    setEditItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdate = () => {
    loadData();
    setIsEditModalOpen(false);
  };

  const deleteData = (item) => {
    console.log("Delete item: ", item);
  };

  return (
    <>
      <AdminHeader />
      <div className="container my-4">
        <div className="admin-dashboard">
          <h1 className="mb-4">Food Items</h1>
          <Link className="btn btn-success mb-3" to="/uploadFoodItems">
            Upload Food Item
          </Link>
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedFoodItems).map((category) => (
                <React.Fragment key={category}>
                  <tr>
                    <th colSpan={6} className="bg-light text-center">{category}</th>
                  </tr>
                  {groupedFoodItems[category].map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>
                        {Object.entries(item.options).map(([key, value]) => (
                          <div key={key}>
                            {typeof value === "object" ? (
                              Object.entries(value).map(([subKey, subValue]) => (
                                <div key={subKey}>
                                  {subKey}: {subValue.toString()}
                                </div>
                              ))
                            ) : (
                              value.toString()
                            )}
                          </div>
                        ))}
                      </td>
                      <td>
                        <img
                          src={item.img}
                          alt={item.name}
                          className="img-fluid"
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteData(item)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isEditModalOpen && (
        <EditForm
          item={editItem}
          categories={foodCat}
          onClose={handleCloseModal}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
};

export default FoodItem;
