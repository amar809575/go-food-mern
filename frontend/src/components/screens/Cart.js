import React from 'react';
import { useCart, useDispatchCart } from '../ContextReducer';
<<<<<<< HEAD
import trash from '../trash.png'; // Ensure correct path
=======
import trash from '.././trash.png';
>>>>>>> origin/master
import '../../App.css';

function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
<<<<<<< HEAD
            <div className='text-center mt-5 fs-3'>
                The Cart is Empty
=======
            <div>
                <div className='m-5 w-100 text-center fs-3'>The Cart is Empty</div>
>>>>>>> origin/master
            </div>
        )
    }

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail");
        try {
            const response = await fetch('http://localhost:5000/api/orderData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

<<<<<<< HEAD
            if (response.ok) {
                dispatch({ type: "DROP" });
                alert('Order placed successfully!');
            } else {
                console.error("Error:", response.statusText);
                alert('Failed to place the order.');
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert('An error occurred. Please try again.');
=======
            console.log("Response Status:", response.status);
            console.log("Response Text:", response.statusText);

            if (response.ok) {
                dispatch({ type: "DROP" });
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.message);
>>>>>>> origin/master
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);
<<<<<<< HEAD

    return (
        <div className='container mt-5'>
            <div className='table-responsive'>
=======
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
>>>>>>> origin/master
                <table className="table table-borderless table-light">
                    <thead className='text-dark fs-4'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Options</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
<<<<<<< HEAD
                                <td>&#8377;{food.price}</td>
                                <td>
                                    <button 
                                        type='button' 
                                        className='btn p-0 d-flex align-items-center justify-content-center bg-light'
                                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                                    >
                                        <img 
                                            src={trash} 
                                            alt='delete' 
                                            style={{ maxHeight: '30px', maxWidth: '30px' }} 
                                        />
=======
                                <td>{food.price}</td>
                                <td>
                                    <button type='button' className='btn p-0 d-flex align-items-center justify-content-center bg-light'>
                                        <img src={trash} alt='delete' onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                            style={{ maxHeight: '30px', maxWidth: '30px', display: 'block', margin: 'auto' }} />
>>>>>>> origin/master
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

<<<<<<< HEAD
                <div className='mt-3'>
                    <h2 className='text-light'>
                        Total Price: &#8377;{totalPrice}/-
                    </h2>
                </div>
                <div className='mt-3'>
                    <button className='btn btn-dark' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    );
=======
                <div>
                    <h2 className='text-dark'>
                        Total Price: &#8377;{totalPrice}/-
                    </h2>
                </div>
                <div>
                    <button className='btn btn-dark mt-5' onClick={handleCheckout}>Check Out</button>
                </div>
            </div>
        </div>
    )
>>>>>>> origin/master
}

export default Cart;
