// src/pages/Cart.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Cart = () => {
  const navigate = useNavigate();

 const [cartItems, setCartItems] = useState([]);


// Load Cart Data
useEffect(() => {

  fetchCart();

}, []);


const fetchCart = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.get(

        `${API_URL}/api/cart/user`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setCartItems(res.data);

  } catch (error) {

    console.log(error);
  }
};


  // Increase Quantity
 const increaseQty = (id) => {

  const updatedCart =
    cartItems.map((item) =>

      item._id === id

        ? {
            ...item,
            quantity:
              item.quantity + 1,
          }

        : item
    );


  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};


  // Decrease Quantity
 const decreaseQty = (id) => {

  const updatedCart =
    cartItems.map((item) =>

      item._id === id

        ? {
            ...item,
            quantity:
              item.quantity > 1
                ? item.quantity - 1
                : 1,
          }

        : item
    );


  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
};


  // Remove Item
const removeItem = async (id) => {

  try {

    const token =
      localStorage.getItem("token");

    await axios.delete(

      `${API_URL}/api/cart/remove/${id}`,

      {
        headers: {

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    // UPDATE UI
    setCartItems(

      cartItems.filter(
        (item) =>
          item._id !== id
      )
    );

  } catch (error) {

    console.log(error);
  }
};

  // Total Price
 const totalPrice = cartItems.reduce(
  (total, item) =>
    total +
    ((item.productId?.price || 0) *
      item.quantity),
  0
);

const validCartItems = cartItems.filter(
  (item) => item.productId
);



  return (
    <div className="cart-page">

      <h1>Your Cart</h1>

      <div className="cart-container">

        {/* LEFT */}

      <div className="cart-items">

  {cartItems.length === 0 ? (

    <h2>Your Cart is Empty</h2>

  ) : (

   validCartItems.map((item) => (

 <div
  className="cart-card"
  key={item._id}
>

  <img
  src={item.productId.image}
  alt={item.productId.name}
/>
  <div className="cart-details">

    <h3>
      {item.productId.name}
    </h3>

    <p>
      ₹
      {item.productId.price}
    </p>

    <div className="qty-box">

      <button
        onClick={() =>
          decreaseQty(item._id)
        }
      >
        -
      </button>

      <span>
        {item.quantity}
      </span>

      <button
        onClick={() =>
          increaseQty(item._id)
        }
      >
        +
      </button>

    </div>

  </div>

  <button
    className="remove-btn"
    onClick={() =>
      removeItem(item._id)
    }
  >
    Remove
  </button>

</div>

))

  )}

</div>

        {/* RIGHT */}

        <div className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Total Items</span>

            <span>{validCartItems.length}</span>
          </div>

          <div className="summary-row">
            <span>Total Price</span>

            <span>₹ {totalPrice}</span>
          </div>
<button
  className="checkout-btn"
  onClick={() =>
    navigate("/checkout", {
      state: {
  cartItems: validCartItems,
  totalPrice,
},
    })
  }
>
  Proceed To Checkout
</button>

        </div>

      </div>

    </div>
  );
};

export default Cart;