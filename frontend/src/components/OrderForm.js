import React from 'react';

function OrderForm({ formData, errors, onChange }) {
  return (
    <div className="order-form">
      <h3 className="form-title">Delivery Information</h3>
      
      <div className="form-group">
        <label className="form-label">First Name *</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          className={`form-input ${errors.firstName ? 'input-error' : ''}`}
          placeholder="Enter first name"
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Last Name *</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          className={`form-input ${errors.lastName ? 'input-error' : ''}`}
          placeholder="Enter last name"
        />
        {errors.lastName && (
          <span className="error-message">{errors.lastName}</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Delivery Address *</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={onChange}
          className={`form-textarea ${errors.address ? 'input-error' : ''}`}
          placeholder="Enter your complete address"
          rows="3"
        />
        {errors.address && (
          <span className="error-message">{errors.address}</span>
        )}
      </div>
    </div>
  );
}

export default OrderForm;