import React from 'react'

const Footer = () => {
  return (
    <div>

<footer className="footer">

  <div className="footer-container">

    {/* LOGO */}

    <div className="footer-box">

      <h2>MultiVendor</h2>

      <p>
        Your trusted multi-vendor shopping platform.
        Buy top quality products from verified vendors.
      </p>

    </div>


    {/* QUICK LINKS */}

    <div className="footer-box">

      <h3>Quick Links</h3>

      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Cart</li>
        <li>Orders</li>
      </ul>

    </div>


    {/* CUSTOMER SUPPORT */}

    <div className="footer-box">

      <h3>Customer Support</h3>

      <ul>
        <li>Help Center</li>
        <li>Privacy Policy</li>
        <li>Terms & Conditions</li>
        <li>Contact Us</li>
      </ul>

    </div>


    {/* CONTACT */}

    <div className="footer-box">

      <h3>Contact</h3>

      <p>Email: support@multivendor.com</p>

      <p>Phone: +91 9876543210</p>

      <p>Location: Kerala, India</p>

    </div>

  </div>


  {/* BOTTOM */}

  <div className="footer-bottom">

    <p>
      © 2026 MultiVendor. All Rights Reserved.
    </p>

  </div>

</footer></div>
  )
}

export default Footer