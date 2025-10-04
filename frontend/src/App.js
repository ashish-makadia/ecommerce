import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductListingPage from './pages/ProductListingPage';
import CartPage from './pages/CartPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import { fetchProducts, placeOrder } from './services/api';
import './App.css';

function App() {
  // State management
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products'); // 'products', 'cart', 'success'
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  // Fetch products 
  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from API
  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      if (response.success) {
        setProducts(response.data);
      } 
    } catch (error) {
      console.error('Failed to load products:', error);
      alert('Failed to load products. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  // Add product to cart
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      // If product already in cart, increase quantity
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    
    alert('Product added to cart!');
  };

  // Update  cart qty
  const handleUpdateQuantity = (productId, change) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    return newErrors;
  };

  // Place order
const handlePlaceOrder = async () => {
  try {
    if (!formData || !formData.firstName || !formData.lastName || !formData.address) {
      alert('Please fill in all form fields before placing the order.');
      return;
    }

    
    const orderPayload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      items: cart, 
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) 
    };

    console.log('Request payload:', orderPayload);

    const response = await placeOrder(orderPayload);

    console.log('Response:', response);

    if (response.success) {
      setOrderId(response.id); 
      setCurrentPage('success');
      setCart([]);
      setFormData({ firstName: '', lastName: '', address: '' });
      setErrors({});
    } else {
      alert(response.error || 'Failed to place order');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order. Please try again.');
  }
};
  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  
  const handleContinueShopping = () => {
    setCurrentPage('products');
  };

 
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div className="app">
      
      <Header 
        cartCount={cartCount} 
        onCartClick={handleCartClick} 
      />
      
      
      <main className="main-content">
        {
          currentPage === 'products' && (
          <ProductListingPage 
            products={products} 
            onAddToCart={handleAddToCart} 
          />
        )}
        
        {
          currentPage === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemove={handleRemoveFromCart}
            formData={formData}
            errors={errors}
            onFormChange={handleFormChange}
            onPlaceOrder={handlePlaceOrder}
            onContinueShopping={handleContinueShopping}
          />
        )}
        
        {
          currentPage === 'success' && (
          <OrderSuccessPage 
            orderId={orderId}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </main>
    </div>
  );
}

export default App;