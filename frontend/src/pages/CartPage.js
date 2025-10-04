import React from 'react';
import OrderForm from '../components/OrderForm';

function CartPage({ 
  cart, 
  onUpdateQuantity, 
  onRemove, 
  formData, 
  errors, 
  onFormChange, 
  onPlaceOrder,
  onContinueShopping
}) {
  
  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleUpdateQuantity = async (itemId, change) => {
    try {
      await onUpdateQuantity(itemId, change);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Error updating quantity. Please try again.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await onRemove(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Error removing item. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Shopping Cart</h2>

      // empty cart
      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-cart-text">Your cart is empty</p>
          <button 
            className="button-primary"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content">
          {/* Cart Items Section */}
          <div className="cart-items-section">
            <h3 className="section-title">Items in Cart</h3>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <p className="cart-item-price">${item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-button"
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      className="quantity-button"
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-button"
                    onClick={() => handleRemoveItem(item.id)}
                    title="Remove from cart"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            // total price
            <div className="cart-total">
              <span className="total-label">Total:</span>
              <span className="total-amount">{calculateTotal()}</span>
            </div>
          </div>

          
          <OrderForm 
            formData={formData}
            errors={errors}
            onChange={onFormChange}
          />

          
          <div className="cart-actions">
            <button 
              className="button-secondary"
              onClick={onContinueShopping}
            >
              Continue Shopping
            </button>
            <button 
              className="button-primary"
              onClick={onPlaceOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;