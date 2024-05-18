const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.get('/cartData', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    res.send(data);
  });
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading cart.json:', err);
      res.status(500).json({ result: 0, error: 'Internal server error' });
      return;
    }

    let cart;
    try {
      cart = JSON.parse(data);
    } catch (err) {
      console.error('Error parsing cart.json:', err);
      res.status(500).json({ result: 0, error: 'Internal server error' });
      return;
    }

    const item = req.body;
    cart.push(item);

    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        console.error('Error writing to cart.json:', err);
        res.status(500).json({ result: 0, error: 'Internal server error' });
      } else {
        res.json({ result: 1 });
      }
    });
  });
});

app.listen(3000, function () {
  console.log('server is running on port 3000!');
});
