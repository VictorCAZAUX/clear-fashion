const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const produits =require('./all_products.json')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/price/:id', (request, response) => {
  const idprice = parseInt(request.params.id)
  const price = produits.filter(produit => produit.price === idprice)
  response.status(200).json(price)

});

app.get('/brand/:id', (request, response) => {
  const idbrand = request.params.id
  const marque = produits.filter(produit => produit.brand === idbrand)
  response.status(200).json(marque)

});


app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);