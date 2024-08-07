import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import React, { useEffect, useState } from "react";
import Card from "../Card";
import Header from "../Header";
import Footer from "../Footer";
import '../../App.css';

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
<<<<<<< HEAD
=======

>>>>>>> origin/master
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();
      setFoodItem(responseData[0]);
      setFoodCat(responseData[1]);

<<<<<<< HEAD
=======
      // console.log(responseData[0]);
>>>>>>> origin/master
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Header />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
<<<<<<< HEAD
        <div className="carousel-inner">
=======
        <div className="carousel-inner" id="carousel">
>>>>>>> origin/master
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
<<<<<<< HEAD
                onChange={(e) => setSearch(e.target.value)}
              />
=======
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
>>>>>>> origin/master
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVyZ2VyfGVufDB8fDB8fHww"
<<<<<<< HEAD
              className="d-block w-100"
              alt="Burger"
              style={{ filter: "brightness(30%)", height: "600px" }}
=======
              style={{ filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
>>>>>>> origin/master
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bW9tb3xlbnwwfHwwfHx8MA%3D%3D"
<<<<<<< HEAD
              className="d-block w-100"
              alt="Momo"
              style={{ filter: "brightness(30%)", height: "600px" }}
=======
              style={{ filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
>>>>>>> origin/master
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/184946701/photo/pizza.webp?b=1&s=170667a&w=0&k=20&c=XsysvNtnkEZNnr6CurzM3ej9NBWmtL1G-Jd_V1OkS2k="
<<<<<<< HEAD
              className="d-block w-100"
              alt="Pizza"
              style={{ filter: "brightness(30%)", height: "600px" }}
=======
              style={{ filter: "brightness(30%)" }}
              className="d-block w-100"
              alt="..."
>>>>>>> origin/master
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
<<<<<<< HEAD
      <div className="container my-5">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="mb-4">
              <h3 className="text-success mb-3">{category.CategoryName}</h3>
              <hr />
              <div className="row">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3 mb-4"
                      >
                        <Card
                          foodItem={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div className="text-danger">No Items Found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-danger">No Categories Found</div>
=======
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id} className="row mb-3">
              <div className="fs-3 m-3 text-success">{category.CategoryName}</div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter(
                    (item) =>
                      item.CategoryName === category.CategoryName &&
                      item.name
                        .toLowerCase()
                        .includes(search.toLocaleLowerCase())
                  )
                  .map((filterItems) => (
                    <div
                      key={filterItems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        foodItem={filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div className="text-danger">No Such Data Found</div>
              )}
            </div>
          ))
        ) : (
          <div className="text-danger">---------</div>
>>>>>>> origin/master
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
