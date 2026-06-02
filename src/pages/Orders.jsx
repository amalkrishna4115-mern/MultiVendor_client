

import React, {useEffect,useState,} from "react";

import axios from "axios";



const Orders = () => {

  const [orders, setOrders] = useState([]);


  // GET ORDERS
  const getOrders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders"
      );

      setOrders(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  const cancelOrder = async (id) => {

  try {

    await axios.put(
      `http://localhost:5000/api/orders/cancel/${id}`
    );

    alert("Order Cancelled");

    getOrders();

  } catch (error) {

    console.log(error);
  }
};


  useEffect(() => {

    getOrders();

  }, []);

  useEffect(() => {

  fetchOrders();

}, []);

const fetchOrders =
  async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        );

      let url = "";

      // USER
      if (
        user.role === "user"
      ) {

        url =
          "http://localhost:5000/api/orders/user";
      }

      // VENDOR
      else {

        url =
          "http://localhost:5000/api/orders/vendor";
      }


      const res =
        await axios.get(

          url,

          {
            headers: {

              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setOrders(res.data);

    } catch (error) {

      console.log(error);
    }
};


const clearOrders =
  async () => {

    try {

      await axios.delete(

        "http://localhost:5000/api/orders/clear"
      );

      setOrders([]);

      alert(
        "Orders Cleared"
      );

    } catch (error) {

      console.log(error);
    }
};


// _________________________________




useEffect(() => {

  fetchVendorOrders();

}, []);

useEffect(() => {

  fetchOrders();

}, []);


const fetchVendorOrders =
  async () => {

    const token =
      localStorage.getItem(
        "token"
      );

    const res =
      await axios.get(

        "http://localhost:5000/api/orders/vendor",

        {
          headers: {

            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    setOrders(res.data);
};




  return (
    <div className="orders-page">

      {/* HEADER */}

      <div className="orders-header">

        <h1>My Orders</h1>

        <p>
          Track all your recent purchases
        </p>

      </div>



      {/* ORDERS */}

      <div className="orders-container">

        {orders.length === 0 ? (

          <div className="empty-orders">

            <h2>No Orders Found</h2>

          </div>

        ) : (
          
          orders.map((order) => (
          
            <div
              className="order-card"
              key={order._id}
            >

              {/* TOP */}

              <div className="order-top">

                <div>

                  <h3>
                    Order ID
                  </h3>

                  <p>
                    {order._id}
                  </p>

                </div>


                <div className="status">

                  {order.orderStatus}

                </div>

              </div>



              {/* PRODUCTS */}

              <div className="order-products">

                
  <div className="order-products">

  {(order.products || []).map(
    (item, index) => (

      <div key={index}>

        <img
          src={`http://localhost:5000/uploads/${item.productId?.image}`}
          width="100"
          alt=""
        />

        <h3>
          {item.productId?.name}
        </h3>

        <p>
          ₹ {item.productId?.price}
        </p>

        <p>
          Qty: {item.quantity}
        </p>

      </div>
    )
  )}

</div>

               

              </div>



              {/* ADDRESS */}

              <div className="shipping-section">

                <h3>
                  Shipping Address
                </h3>

                <p>
                  {
                    order.shippingAddress
                      ?.name
                  }
                </p>

                <p>
                  {
                    order.shippingAddress
                      ?.phone
                  }
                </p>

                <p>
                  {
                    order.shippingAddress
                      ?.address
                  }
                </p>

                <p>
                  {
                    order.shippingAddress
                      ?.city
                  }{" "}
                  -{" "}
                  {
                    order.shippingAddress
                      ?.pincode
                  }
                </p>

              </div>
<button
className="cancel-btn"
  onClick={clearOrders}
>
  Clear Orders
</button>


              {/* FOOTER */}

          <div className="order-footer">

  <div>

    Payment :
    {" "}
    <strong>
      {order.paymentMethod}
    </strong>

  </div>



  <div className="footer-right">

    <div className="total-price">

      Total :
      {" "}
      ₹ {order.totalAmount}

    </div>


    {/* CANCEL BUTTON */}

    {order.orderStatus === "Pending" && (

      <button
        className="cancel-btn"
        onClick={() =>
          cancelOrder(order._id)
        }
      >
        Cancel Order
      </button>

    )}


    {/* CANCELLED TEXT */}

    {order.orderStatus ===
      "Cancelled" && (

      <div className="cancelled-text">

        Order Cancelled

      </div>

    )}

  </div>

</div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Orders;