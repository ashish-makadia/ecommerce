import React from 'react';

function ProductCart({ product, onAddToCart }) {
  return (
    <div className="product-cart">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price}</span>
          <button 
            className="add-to-cart-button"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCart;