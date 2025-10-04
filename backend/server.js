const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const products = require('./product');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());


app.get('/api/products', (req, res) => {
  try {
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});


app.post('/api/orders', (req, res) => {
  try {
    const { firstName, lastName, address, items, total } = req.body;

    if (!firstName || !lastName || !address) {
      return res.status(400).json({ 
        error: 'First name, last name, and address are required' 
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ 
        error: 'Cart cannot be empty' 
      });
    }

    const orderDetails = {
      id: Date.now().toString(), 
      customer: { firstName, lastName, address },
      items,
      total,
      orderDate: new Date().toISOString()
    };

    console.log('Order placed successfully:', orderDetails);

    
    res.json({ 
      success: true, 
      message: 'Order placed successfully!',
      id: orderDetails.id
    });

  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Failed to place order' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
