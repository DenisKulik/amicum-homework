const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express();

app.use(bodyParser.json())
app.use(express.static('.'))

app.get('/catalogData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    fs.readFile('catalog.json', 'utf8', (err, data) => {
        res.send(data);
    })
})

app.get('/cartData', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    fs.readFile('cart.json', 'utf8', (err, data) => {
        res.send(data);
    })
})

app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data)
            const item = req.body

            cart.push(item)

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                }
            })
        }
    })
})

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});
