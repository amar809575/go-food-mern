import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import '../App.css';

export default function Card(props) {
  const priceRef = useRef();
  const data = useCart();
  const dispatch = useDispatchCart();
  const option = props.options;

  // Ensure option is defined
  const priceOptions = option ? Object.keys(option) : [];

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const finalPrice = size && option ? qty * parseInt(option[size]) : 0;

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  if (!props.foodItem) {
    return <div>No food item available</div>;
  }

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "460px", backgroundColor: "#f8f9fa", overflow: "hidden" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt={props.foodItem.name || 'Food image'}
        style={{ height: "170px", objectFit: "cover" }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100 mb-3">
          <div className="row">
            <div className="col-6">
              <select
                className="form-select mb-2 bg-success text-white"
                onChange={(e) => setQty(e.target.value)}
                value={qty}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-6">
              <select
                className="form-select mb-2 bg-success text-white"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
                value={size}
              >
                {priceOptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-inline fs-5 text-success">
            &#8377;{finalPrice}/-
          </div>
        </div>
        <button
          className="btn btn-success w-100"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
