import React, { useState, useEffect } from 'react';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    validateSession();
  }, []);

  const validateSession = () => {
    const accessToken = getAccessToken();
    if (!accessToken || !isValidToken(accessToken)) {
      handleInvalidSession();
    }
  };

  const getAccessToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'accessToken') {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  const isValidToken = (token) => {
    // Implement token validation logic (e.g., decode JWT and check expiry)
    // For now, return true for illustration
    return true;
  };

  const handleInvalidSession = () => {
    // Perform actions for invalid or expired session
    // For example, redirect to login page
    // window.location.href = '/login';
  };

  const handlePlaceOrder = async (orderData) => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken || !isValidToken(accessToken)) {
        handleInvalidSession();
        return;
      }

      // Validate order data
      if (!isValidOrderData(orderData)) {
        throw new Error('Invalid order data');
      }

      const response = await fetch('/api/placeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.error('Error placing order:', error);
      handleOrderError(error);
    }
  };

  const isValidOrderData = (orderData) => {
    // Implement order data validation logic
    // For now, return true for illustration
    return true;
  };

  const handleOrderError = (error) => {
    // Handle specific order-related errors
    if (error.message === 'Failed to place order') {
      // Display error message to the user
      // For example, show a notification
    } else if (error.message === 'Invalid order data') {
      // Log the error for further investigation
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pizza Delivery Website</h1>
      </header>
      <main>
        <OrderForm onPlaceOrder={handlePlaceOrder} />
        {order && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            <p>Order ID: {order.orderId}</p>
            <p>Total Amount: ${order.totalAmount}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
