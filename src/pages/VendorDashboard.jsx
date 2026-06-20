import React,{useEffect,useState,} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;



const VendorDashboard = () => {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [vendorOrders, setVendorOrders] = useState([]);

const [formData, setFormData] = useState({
  name: "",
  price: "",
  image: null,
  description: "",
  category: "",
});

  const [editId, setEditId] =
  useState(null);


  const getProducts = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    const res = await axios.get(
      `${API_URL}/api/products?vendorId=${user._id}`
    );


    setProducts(res.data);

  } catch (error) {

    console.log(error);
  }
};

// ___________________vendorordersget_______

      const getVendorOrders = async () => {

  try {

    const token =
      localStorage.getItem("token");

    const res = await axios.get(

      `${API_URL}/api/orders/vendor`,

      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    setVendorOrders(
      res.data
    );

  } catch (error) {

    console.log(error);
  }
};

// ______________________________


  // CHECK VENDOR LOGIN
  useEffect(() => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    if (!user) {

      navigate("/login");

    } else if (user.role !== "vendor") {

      alert("Access Denied");

      navigate("/");
    }

  }, []);



  // INPUT CHANGE
  const handleChange = (e) => {

  if (e.target.name === "image") {

    setFormData({
      ...formData,
      image: e.target.files[0],
    });

  } else {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }
};

const user = JSON.parse(
  localStorage.getItem("user")
);

  // ADD PRODUCT

  const addProduct = async () => {

  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );


    const data = new FormData();

    data.append(
      "vendorId",
      user._id
    );

    data.append(
      "name",
      formData.name
    );

    data.append(
      "price",
      formData.price
    );

    data.append(
      "description",
      formData.description
    );
    data.append(
  "category",
  formData.category
);



    // IMAGE
    if (formData.image) {

      data.append(
        "image",
        formData.image
      );

    }


    // EDIT PRODUCT
    if (editId) {

      await axios.put(

        `${API_URL}/api/products/update/${editId}`,

        data
      );

      alert("Product Updated");

    }

    // ADD PRODUCT
    else {

      const token = localStorage.getItem("token");
await axios.post(
  `${API_URL}/api/products/add`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);
    }


    // RESET
 setFormData({
  name: "",
  price: "",
  description: "",
  image: null,
  category: "",
});
    setEditId(null);

    getProducts();

  } catch (error) {

  console.log("FULL ERROR:", error);

  console.log("RESPONSE:", error.response);

  console.log("DATA:", error.response?.data);

  toast.error(
    JSON.stringify(error.response?.data)
  );
}
};


const editProduct = (product) => {

  setEditId(product._id);

  setFormData({

    name: product.name,

    price: product.price,

    description:
      product.description,

    image: null,
  });

};


  // DELETE PRODUCT
  const deleteProduct = async (id) => {

  try {

    await axios.delete(
      `${API_URL}/api/products/${id}`
    );

    getProducts();

  } catch (error) {

    console.log(error);
  }
};



  // LOAD PRODUCTS
  // useEffect(() => {

  //   const storedProducts =
  //     JSON.parse(
  //       localStorage.getItem(
  //         "vendorProducts"
  //       )
  //     ) || [];


  //   setProducts(storedProducts);

  // }, []);
useEffect(() => {

  getProducts();

  getVendorOrders();

}, []);

console.log(products);



  return (
    <div className="vendor-dashboard">

      {/* HEADER */}

      <div className="vendor-header">

        <h1>Vendor Dashboard</h1>

        
        <button className="cart-btn"onClick={() => {localStorage.removeItem("user"); navigate("/");}} >
          Logout
        </button>
<button className="cart-btn1" onClick={() => navigate("/home")}>Home</button>

      </div>



      <div className="dashboard-container">


        {/* LEFT */}

        <div className="add-product">

          <h2>Add Product</h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

         <input
  type="file"
  name="image"
  onChange={handleChange}
/>
<select
  name="category"
  value={formData.category}
  onChange={handleChange}
>
  <option value="">Select Category</option>
  <option value="Electronics">Electronics</option>
  <option value="Fashion">Fashion</option>
  <option value="Shoes">Shoes</option>
  <option value="Watches">Watches</option>
  <option value="Gaming">Gaming</option>
</select>

          <textarea
            name="description"
            placeholder="Description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

<button
  onClick={addProduct}
  disabled={!user?.isApproved}
>
  {editId
    ? "Update Product"
    : "Add Product"}
</button>
{!user?.isApproved && (
  <p style={{ color: "red", marginTop: "10px" }}>
    Your vendor account is waiting for admin approval.
  </p>
)}

        </div>




        {/* RIGHT */}

        <div className="product-list">

          <h2>Your Products</h2>

          <div className="vendor-products">

            {products.length === 0 ? (
              <p>No Products Added</p>
            ) : (
              products.map((product) => (


                <div
                  className="vendor-card"
                  key={product._id}
                >

  <img
  src={product.image}
  alt={product.name}
/>

                  <h3>{product.name}</h3>

                  <p>
                    ₹ {product.price}
                  </p>

                  <button
  className="edit-btn1"
  onClick={() => editProduct(product)}
>
  Edit
</button>

                  <button
                    onClick={() =>
                      deleteProduct(product._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))
            )}

          </div>

        </div>

        

      </div>
      
        {/* {mid__} */}

        <div className="sales-section">

  <h2>
    Product Sales
  </h2>

  {vendorOrders.map((order) => (

    <div
      key={order.orderId}
      className="sale-card"
    >

     <img
  className="imgsale"
  src={order.productImage}
  alt={order.productName}
/>

      <div>

        <h3>
          {order.productName}
        </h3>

        <p>
          Buyer:
          {" "}
          {order.buyerName}
        </p>

        <p>
          Email:
          {" "}
          {order.buyerEmail}
        </p>

        <p>
          Qty:
          {" "}
          {order.quantity}
        </p>

        <p>
          Price:
          {" "}
          ₹{order.price}
        </p>

        <p>
          Total:
          {" "}
          ₹{order.total}
        </p>

        <p>
          Status:
          {" "}
          {order.status}
        </p>

      </div>

    </div>

  ))}

</div>


    </div>
  );
};

export default VendorDashboard;