
import React from 'react';

function OrderSuccessPage({ orderId, onContinueShopping }) {
  return (
    <div className="page-container">
      <div className="success-page">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Order Placed Successfully!</h2>
        <p className="success-message">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        {orderId && (
          <p className="order-id">
            Order ID: <strong>{orderId}</strong>
          </p>
        )}
        <button 
          className="button-primary"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccessPage;