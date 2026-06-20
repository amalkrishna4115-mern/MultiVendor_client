
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";

const API_URL = import.meta.env.VITE_API_URL;

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [cartCount, setCartCount] = useState(0);
  
  const [selectedCategory,
  setSelectedCategory] = useState("All");
  
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const user = JSON.parse(
  localStorage.getItem("user")
);

const [products, setProducts] =useState([]);

// const filteredProducts = products.filter(
//   (product) =>
//     product.name
//       .toLowerCase()
//       .includes(search.toLowerCase()) ||
//     product.description
//       ?.toLowerCase()
//       .includes(search.toLowerCase())
// );

// const filteredProducts1 =
//   selectedCategory === "All"
//     ? products
//     : products.filter(
//         (product) =>
//           product.category ===
//           selectedCategory
//       );

const filteredProducts = products.filter(
  (product) => {

    const categoryMatch =
      selectedCategory === "All" ||
      product.category ===
        selectedCategory;

    const searchMatch =
      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    return (
      categoryMatch &&
      searchMatch
    );
  }
);




const getProducts = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/products`
    );

    setProducts(res.data);

  } catch (error) {

    console.log(error);
  }
};
const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    title: "Mega Sale 50% Off",
  },
  {
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661",
    title: "Latest Electronics",
  },
  {
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Premium Headphones",
  },
];

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const getCartCount = async () => {

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

    setCartCount(res.data.length);

  } catch (error) {

    console.log(error);
  }
};
// ___________________________________
useEffect(() => {

  getProducts();

  getCartCount();

}, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Wireless Headphone",
  //     price: 1999,
  //     image:
  //       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  //   },

  //   {
  //     id: 2,
  //     name: "Smart Watch",
  //     price: 2999,
  //     image:
  //       "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  //   },

  //   {
  //     id: 3,
  //     name: "Gaming Mouse",
  //     price: 999,
  //     image:
  //       "https://images.unsplash.com/photo-1527814050087-3793815479db",
  //   },

  //   {
  //     id: 4,
  //     name: "Laptop",
  //     price: 55999,
  //     image:
  //       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  //   },
  // ];

  const addToCart = async (product) => {

  try {

    const token =
      localStorage.getItem("token");

    const res =
      await axios.post(

        `${API_URL}/api/cart/add`,

        {
          productId: product._id,
          quantity: 1,
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(res.data);

    alert("Added To Cart");

  } catch (error) {

    console.log(error);

    alert("Add To Cart Failed");
  }
};


  return (
    <div className="home">

      {/* HEADER */}

      <header className="header">

        <div className="logo">
          MultiVendor
        </div>

        <div className="search-box">
       <input
  type="text"
  placeholder="Search Products..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        </div>

       <div className="header-icons">

  {/* Vendor Dashboard Button */}

  {user?.role === "vendor" && (

    <button
      className="nav-btn"
      onClick={() =>
        navigate("/vendor-dashboard")
      }
    >
      Vendor Dashboard
    </button>

  )}


  {/* Orders */}

  <button
    className="nav-btn"
    onClick={() => navigate("/orders")}
  >
    Orders
  </button>


  {/* Cart */}

  <button
    className="cart-btn"
    onClick={() => navigate("/cart")}
  >
    Cart ({cartCount})
  </button>


  {/* Logout */}

  <button
    className="nav-btn"
    onClick={() => {

      localStorage.removeItem("user");

      localStorage.removeItem("token");

      navigate("/");
    }}
  >
    Logout
  </button>

</div>
      </header>


      {/* HERO SECTION */}

      {/* <section className="hero">

        <div className="hero-text">
          <h1>Best Deals On Top Products</h1>

          <p>
            Discover amazing products from multiple vendors.
          </p>

          <button>Shop Now</button>
        </div>

      </section> */}
      <Slider {...settings}>

  {slides.map((slide, index) => (

    <div key={index}>

      <div
        className="hero-slider"
        style={{
          backgroundImage: `url(${slide.image})`,
        }}
      >
        <h1>{slide.title}</h1>
      </div>

    </div>

  ))}
   

</Slider>
<div className="offer-section">

  <div className="offer-card">
    🔥 50% OFF Electronics
  </div>

  <div className="offer-card">
    👟 Buy 1 Get 1 Shoes
  </div>

  <div className="offer-card">
    🎧 Free Shipping
  </div>

</div>

<section className="categories">

  <h2>Categories</h2>

  <div className="category-grid">

    <button
      onClick={() =>
        setSelectedCategory("All")
      }
    >
      All
    </button>
<button onClick={() => setSelectedCategory("Electronics")}>
  📱 Electronics
</button>

<button onClick={() => setSelectedCategory("Fashion")}>
  👕 Fashion
</button>

<button onClick={() => setSelectedCategory("Shoes")}>
  👟 Shoes
</button>

<button onClick={() => setSelectedCategory("Watches")}>
  ⌚ Watches
</button>

  </div>

</section>



      {/* PRODUCTS */}

      <section className="products-section">

        <h2>Featured Products</h2>

        <div className="products-grid">

          {filteredProducts.map((product) => (

            // <div className="product-card"  onClick={() =>navigate("/product-details")}>
            <div className="product-card" key={product._id} onClick={() =>navigate("/product-details", {state: { product },})}>

<img
  src={product.image}
  alt={product.name}
/>
              <h3>{product.name}</h3>

              <p>₹ {product.price}</p>

  <button
  onClick={(e) => {

    e.stopPropagation();

    addToCart(product);
  }}
>
  Add To Cart
</button>

            </div>
          ))}

        </div>
      </section>
      <Footer/>

    </div>
  );
};

export default Home;