import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../App.css";

const EditForm = ({ item, categories, onClose, onUpdate }) => {
  const [foodItem, setFoodItem] = useState({
    name: item.name || "",
    img: item.img || "",
    category: item.CategoryName || "",
    newCategory: "",
    options: item.options || {
      half: "",
      full: "",
      regular: "",
      medium: "",
      large: "",
    },
    description: item.description || "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setFoodItem({
      name: item.name || "",
      img: item.img || "",
      category: item.CategoryName || "",
      newCategory: "",
      options: item.options || {
        half: "",
        full: "",
        regular: "",
        medium: "",
        large: "",
      },
      description: item.description || "",
    });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["half", "full", "regular", "medium", "large"].includes(name)) {
      setFoodItem((prevState) => ({
        ...prevState,
        options: { ...prevState.options, [name]: value },
      }));
    } else {
      setFoodItem((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const filledOptions = Object.entries(foodItem.options)
      .filter(([key, value]) => value !== "")
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const formData = new FormData();
    formData.append("name", foodItem.name);
    formData.append("description", foodItem.description);
    formData.append("options", JSON.stringify(filledOptions));

    if (imageFile) {
      formData.append("imageFile", imageFile);
    } else {
      formData.append("img", foodItem.img);
    }

    const category = foodItem.newCategory || foodItem.category;
    formData.append("CategoryName", category);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/foodItemUpdate/${item._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Food item updated successfully!!!");
        onUpdate();
        onClose();
      } else {
        alert("Failed to update food item!!!");
      }
    } catch (error) {
      console.error("Error updating food item: ", error);
      alert("Error processing the update. Please try again.");
    }
  };

  return (
    <div className="Modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Food Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Food Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={foodItem.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Food Item Image URL
            </label>
            <input
              type="text"
              className="form-control"
              id="img"
              name="img"
              value={foodItem.img}
              onChange={handleChange}
              disabled={!!imageFile}
              required={!imageFile}
            />
          </div>
          <p className="mb-3">OR</p>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="imageFile"
              name="imageFile"
              onChange={handleFileChange}
              disabled={!!foodItem.img}
              required={!foodItem.img}
              placeholder="Upload File From Device"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Food Item Category
            </label>
            <select
              className="form-control"
              id="category"
              name="category"
              value={foodItem.category}
              onChange={handleChange}
              disabled={!!foodItem.newCategory}
              required={!foodItem.newCategory}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.CategoryName}>
                  {category.CategoryName}
                </option>
              ))}
            </select>
          </div>
          <p className="text-center">OR</p>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="newCategory"
              name="newCategory"
              value={foodItem.newCategory}
              onChange={handleChange}
              disabled={!!foodItem.category}
              required={!foodItem.category}
              placeholder="Enter New Category"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Options</label>
            <div className="d-flex">
              {foodItem.category !== "Pizza" ? (
                <div>
                  <input
                    type="text"
                    className="form-control me-2"
                    name="half"
                    placeholder="Half price"
                    value={foodItem.options.half || ""}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    name="full"
                    placeholder="Full price"
                    value={foodItem.options.full || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    className="form-control me-2"
                    name="regular"
                    placeholder="Regular price"
                    value={foodItem.options.regular || ""}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control me-2"
                    name="medium"
                    placeholder="Medium price"
                    value={foodItem.options.medium || ""}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    className="form-control"
                    name="large"
                    placeholder="Large price"
                    value={foodItem.options.large || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={foodItem.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="editFormBtnContainer">
            <button type="submit" className="btn btn-success editFormBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
