import React, { useEffect, useState } from "react";
import ProductCart from "../components/ProductCart";
import { fetchProducts } from "../services/api"; // call backend
import "../App.css";

function ProductListingPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // fetch from backend
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Our Products</h2>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No products available at the moment.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductCart
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductListingPage;
