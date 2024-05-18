import React, { useState } from 'react';
import { placeOrder } from '../services/ApiService';

function OrderForm() {
  const [pizzaType, setPizzaType] = useState('');
  const [pizzaSize, setPizzaSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Perform input validation
      if (!validateInput()) {
        throw new Error('Invalid input');
      }

      // Making API call to place order
      const orderData = {
        pizzaType: sanitizeInput(pizzaType),
        pizzaSize: sanitizeInput(pizzaSize),
        quantity: parseInt(quantity),
      };
      const response = await placeOrder(orderData);
      // Handle success response
      console.log('Order placed successfully:', response);
      setSuccess(true);
    } catch (error) {
      // Handle error
      console.error('Error placing order:', error.message);
      setError('Error placing order. Please try again later.');
    }
    setLoading(false);
  };

  const validateInput = () => {
    return pizzaType.trim() !== '' && pizzaSize.trim() !== '' && quantity > 0;
  };

  const sanitizeInput = (input) => {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pizza Type:
          <input type="text" value={pizzaType} onChange={(e) => setPizzaType(e.target.value)} />
        </label>
        <label>
          Pizza Size:
          <input type="text" value={pizzaSize} onChange={(e) => setPizzaSize(e.target.value)} />
        </label>
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
      {error && <p>{error}</p>}
      {success && <p>Order placed successfully!</p>}
    </div>
  );
}

export default OrderForm;
