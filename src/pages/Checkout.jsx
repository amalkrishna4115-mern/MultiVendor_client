

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

  
const Checkout = () => {

    const location = useLocation();


    const { cartItems, totalPrice } =
  location.state || {
    cartItems: [],
    totalPrice: 0,
  };



    // ______________________________odersave______




    // ______________________________________________



    const [shippingAddress,
  setShippingAddress] =
  useState("");

const [paymentMethod,
  setPaymentMethod] =
  useState("COD");


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


 const placeOrder =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

  console.log(
  cartItems.map((item) => ({
    productId: item.productId?._id || item._id,
    vendorId: item.productId?.vendorId || item.vendorId,
    productName: item.productId?.name || item.name,
    price: item.productId?.price || item.price,
    quantity: item.quantity,
  }))
);

      await axios.post(

        "http://localhost:5000/api/orders/create",

        
        
        {
          
          
          
  products: cartItems.map((item) => ({
  productId: item.productId?._id || item._id,

  vendorId:
    item.productId?.vendorId ||
    item.vendorId,

  productName:
    item.productId?.name ||
    item.name,

  price:
    item.productId?.price ||
    item.price,

  quantity:
    item.quantity || 1,
})),

          totalAmount:
            totalPrice,

          shippingAddress,

          paymentMethod,
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Order Placed Successfully"
      );

    } catch (error) {
  console.log("FULL ERROR:", error);

  if (error.response) {
    console.log("SERVER RESPONSE:");
    console.log(error.response.data);
  }
}
};

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* LEFT */}

        <div className="checkout-form">

          <h2>Shipping Address</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
          />

<input
  type="text"
  rows="4"
            name="address"

  placeholder="Enter Address"

  value={shippingAddress}

  onChange={(e) =>
    setShippingAddress(
      e.target.value
    )
  }
/>
          {/* <textarea
            name="address"
            placeholder="Full Address"
            rows="4"
            onChange={handleChange}
          ></textarea> */}

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
          />


          {/* PAYMENT */}

          <h2>Payment Method</h2>

        <select
  value={paymentMethod}

  onChange={(e) =>
    setPaymentMethod(
      e.target.value
    )
  }
>

  <option value="COD">
    Cash On Delivery
  </option>

  <option value="Online">
    Online Payment
  </option>

</select>

        </div>


        {/* RIGHT */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

         {cartItems.map((item) => (

  <div
    className="summary-row"
    key={item._id}
  >
    <span>
      {item.productId
      ? item.productId.name
      : item.name} × {item.quantity}
    </span>

    <span>
      ₹ {item.productId
      ? item.productId.price
      : item.price * item.quantity}
    </span>
  </div>

))}


<div className="summary-row">
  <span>Delivery</span>

  <span>₹ 50</span>
</div>


<hr />


<div className="summary-row">
  <strong>Total</strong>

  <strong>
    ₹ {totalPrice + 50}
  </strong>
</div>

          <button onClick={placeOrder}>
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
};

export default Checkout;