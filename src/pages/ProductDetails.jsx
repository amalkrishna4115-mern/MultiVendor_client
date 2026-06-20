

import React from "react";
import { useNavigate, useLocation, } from "react-router-dom";





const ProductDetails = () => {

  const navigate = useNavigate();

const location = useLocation();

const product = location.state?.product;

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  // SAMPLE PRODUCT
 const API_URL = import.meta.env.VITE_API_URL;

 console.log("API_URL:", API_URL);
console.log("Product:", product);
console.log("Image:", product.image);

  // ADD TO CART
  const addToCart = () => {

    let cart = JSON.parse(
      localStorage.getItem("cart")
    ) || [];


    const existingProduct = cart.find(
      (item) => item.id === product.id
    );


    if (existingProduct) {

      cart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

    } else {

      cart.push({
        ...product,
        quantity: 1,
      });

    }


    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );


    alert("Added To Cart ✅");
  };



  return (
    <div className="product-details-page">

      <div className="product-container">


        {/* LEFT IMAGE */}

        <div className="product-image">
          

   <img
  src={product.image}
  alt={product.name}
/>
        </div>



        {/* RIGHT DETAILS */}

        <div className="product-info">

          <span className="category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <div className="rating">
            ⭐ {product.rating} Rating
          </div>


          {/* PRICE */}

          <div className="price-section">

            <h2>
              ₹ {product.price}
            </h2>

            <span>
              ₹ {product.oldPrice}
            </span>

          </div>


          {/* DESCRIPTION */}

          <p className="description">
            {product.description}
          </p>


          {/* STOCK */}

          <div className="stock">
            In Stock :
            <span>
              {" "}
              {product.stock} Available
            </span>
          </div>


          {/* VENDOR */}

          <div className="vendor">

            Sold By :
            <strong>
              {" "}
              {product.vendor}
            </strong>

          </div>


          {/* BUTTONS */}

          <div className="buttons">

            <button
              className="cart-button"
              onClick={addToCart}
            >
              Add To Cart
            </button>


       <button
  className="buy-button"
  onClick={() =>
    navigate("/checkout", {
      state: {
        cartItems: [
          {
            ...product,
            quantity: 1,
          },
        ],

        totalPrice: product.price,
      },
    })
  }
>
  Buy Now
</button>

          </div>


          {/* FEATURES */}

          <div className="features">

            <div>
              🚚 Free Delivery
            </div>

            <div>
              🔒 Secure Payment
            </div>

            <div>
              ↩️ 7 Days Return
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;