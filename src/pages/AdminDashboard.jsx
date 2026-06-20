import React, {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {

  const [stats, setStats] = useState({
  totalUsers: 0,
  totalVendors: 0,
  totalProducts: 0,
  totalOrders: 0,
});



const [products, setProducts] = useState([]);

    
  const [vendors, setVendors] =
    useState([]);

  const [commission,
    setCommission] =
    useState(10);

 useEffect(() => {

  getDashboardData();
  getVendors();
  getProducts();

}, []);


const deleteProduct = async (id) => {

  try {

    await axios.delete(
      `${API_URL}/api/admin/product/${id}`
    );

    alert("Product Deleted");

    getProducts();

  } catch (error) {

    console.log(error);
  }
};

  const getDashboardData =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/admin/stats`
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    const getProducts = async () => {

  try {

    const res = await axios.get(
      `${API_URL}/api/admin/products`
    );

    setProducts(res.data);

  } catch (error) {

    console.log(error);
  }
};

const deleteVendor = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to remove this vendor?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${API_URL}/api/admin/vendor/${id}`
    );

    alert("Vendor Removed Successfully");

    getVendors();
    getProducts();

  } catch (error) {

    console.log(error);
  }
};

   const navigate = useNavigate(); 
  const getVendors =
    async () => {

      try {

        const res =
          await axios.get(
            `${API_URL}/api/admin/vendors`
          );

        setVendors(res.data);

      } catch (error) {

        console.log(error);
      }
    };

        const approveVendor = async (id) => {
  try {

    await axios.put(
      `${API_URL}/api/admin/vendor/approve/${id}`
    );

    alert("Vendor Approved");

    getVendors(); // reload vendor list

  } catch (error) {

    console.log(error);
  }
};

const rejectVendor = async (id) => {

  await axios.put(
    `${API_URL}/api/admin/vendor/reject/${id}`
  );

  getVendors();
};

  return (
    <div className="admin">

      <h1>
        Super Admin Dashboard
      </h1>

      {/* ANALYTICS */}

      <div className="stats">

        <div className="card">
  <h2>{stats.totalUsers}</h2>
  <p>Total Users</p>
</div>

<div className="card">
  <h2>{stats.totalVendors}</h2>
  <p>Total Vendors</p>
</div>

<div className="card">
  <h2>{stats.totalProducts}</h2>
  <p>Total Products</p>
</div>

<div className="card">
  <h2>{stats.totalOrders}</h2>
  <p>Total Orders</p>
</div>

      </div>

      {/* VENDOR APPROVAL */}

     <div className="vendors">

  <h2>Vendor Approval</h2>

  {vendors.map((vendor) => (

    <div
      className="vendor-card"
      key={vendor._id}
    >

      <h3>{vendor.name}</h3>

      <p>{vendor.email}</p>

      <p>
        Status:
        {" "}
        {
          vendor.isApproved
            ? "Approved"
            : "Pending"
        }
      </p>

      <button
        disabled={vendor.isApproved}
        onClick={() =>
          approveVendor(
            vendor._id
          )
        }
        className={
          vendor.isApproved
            ? "approved-btn"
            : "approve-btn"
        }
      >
        {
          vendor.isApproved
            ? "Approved"
            : "Approve"
        }
      </button>

      <button
        className="reject"
        onClick={() =>
          rejectVendor(
            vendor._id
          )
        }
      >
        Reject
      </button>
      <button
  className="delete-btn"
  onClick={() =>
    deleteVendor(vendor._id)
  }
>
  Remove Vendor
</button>

    </div>

  ))}

</div>

  <div className="admin-products">

  <h2>Manage Products</h2>

  {products.map((product) => (

    <div
      key={product._id}
      className="product-card"
    >

      <img
  src={product.image}
  alt={product.name}
  width="100"
/>
      <h3>{product.name}</h3>

      <p>₹ {product.price}</p>

      <button
        className="delete-btn"
        onClick={() =>
          deleteProduct(product._id)
        }
      >
        Delete Product
      </button>

    </div>

  ))}

</div>

      {/* SETTINGS */}

      <div className="settings">

        <h2>
          Platform Settings
        </h2>

        <label>
          Commission %
        </label>

        <input
          type="number"
          value={commission}
          onChange={(e) =>
            setCommission(
              e.target.value
            )
          }
        />

        <button>
          Save Settings
        </button>

      </div>

      
  

  <button className="reject"
    onClick={() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login");
    }}
  >
    Logout
  </button>


    </div>
  );
};

export default AdminDashboard;