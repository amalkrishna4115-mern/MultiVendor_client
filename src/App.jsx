import { Routes, Route } from "react-router-dom";
import './style/globel.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";
import VendorDashboard from "./pages/VendorDashboard";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />

      <Route path="/" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

         <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product-details" element={<ProductDetails />}/>
            <Route path="/vendor-dashboard" element={<VendorDashboard />}/>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/admin-dashboard" element={<AdminDashboard />}/>

    </Routes>
  );
}

export default App;