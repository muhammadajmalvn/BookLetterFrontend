import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="order-success-container">
      <h1>Order Successful!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/ordered-book" className="btn btn-primary">
        View Orders
      </Link>
    </div>
  );
};

export default OrderSuccess;