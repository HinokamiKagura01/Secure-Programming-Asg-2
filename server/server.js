const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const config = require('./config/config');
const errorMiddleware = require('./middleware/errorMiddleware');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = config.port;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pizza_delivery',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

app.use(bodyParser.json());

// Routes
app.use('/api/orders', orderRoutes);

// Error middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
