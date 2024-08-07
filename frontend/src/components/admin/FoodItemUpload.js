import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const FoodItemUpload = () => {
  const [foodItem, setFoodItem] = useState({
    name: "",
    img: "",
    category: "",
    newCategory: "",
    options: { half: "", full: "", regular: "", medium: "", large: "" },
    description: "",
  });

  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/getCategories"
      );
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

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
      const response = await axios.post(
        "http://localhost:5000/api/uploadFoodItem",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        alert("Food item uploaded successfully!");
        setFoodItem({
          name: "",
          img: "",
          category: "",
          newCategory: "",
          options: { half: "", full: "", regular: "", medium: "", large: "" },
          description: "",
        });
        setImageFile(null);
      } else {
        alert("Failed to upload food item.");
      }
    } catch (error) {
      console.error("Error uploading food item:", error);
      alert("Error uploading food item. Please try again.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Upload Food Item</h2>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
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
              <p className="text-center">OR</p>
              <div className="mb-3">
                <label htmlFor="imageFile" className="form-label">
                  Upload Image File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imageFile"
                  name="imageFile"
                  onChange={handleFileChange}
                  disabled={!!foodItem.img}
                  required={!foodItem.img}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Food Item Category
                </label>
                <select
                  className="form-select"
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
                <label htmlFor="newCategory" className="form-label">
                  Enter New Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newCategory"
                  name="newCategory"
                  value={foodItem.newCategory}
                  onChange={handleChange}
                  disabled={!!foodItem.category}
                  required={!foodItem.category}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Options</label>
                <div className="d-flex flex-wrap gap-2">
                  {foodItem.category !== "Pizza" ? (
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        name="half"
                        placeholder="Half price"
                        value={foodItem.options.half}
                        onChange={handleChange}
                        required={foodItem.category !== "Pizza"}
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="full"
                        placeholder="Full price"
                        value={foodItem.options.full}
                        onChange={handleChange}
                        required={foodItem.category !== "Pizza"}
                      />
                    </div>
                  ) : (
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control"
                        name="regular"
                        placeholder="Regular price"
                        value={foodItem.options.regular}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="medium"
                        placeholder="Medium price"
                        value={foodItem.options.medium}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        className="form-control"
                        name="large"
                        placeholder="Large price"
                        value={foodItem.options.large}
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
              <button type="submit" className="btn btn-success w-100">
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodItemUpload;
