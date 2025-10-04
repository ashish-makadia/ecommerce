import React from 'react';

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="store-name">🛒 TechStore Camera</h1>
        </div>
        <div className="header-right">
          <button className="cart-button" onClick={onCartClick}>
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;