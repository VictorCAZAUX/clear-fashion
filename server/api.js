const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/search', async (request, response) => {
  if(request.query.limit != null)
  {
    var limit = request.query.limit;
  }
  else
  {
    request.query.limit = 12;
    var limit = request.query.limit;
  }
  if(request.query.brand != null && request.query.brand != "all")
  {
   var brand=request.query.brand;
  }
  else
  {
    var brand = /[0-9a-z]/i;
    
  }
  if(request.query.price != null)
  {
   var price=request.query.price;
  }
  else
  {
    var price = 5000;
  }
  if(request.query.page != null)
  {
   var page=request.query.page;
  }
  else
  {
    var page = 1;
  }
  
  
  
  
 
  var query = {"brand": brand, "price": {"$lte": price}};
  console.log(query);
  var products = await db.find({"brand":brand, "price":{'$lte':price}});
  let count = products.length;
  let pageCount = Math.floor(count/limit);

  
  
  query["success"] = true;
  response.send({
    "success": true,
    "data": {
        "result": products.slice((page-1)*limit,page*limit),
        "meta": {
            "currentPage": parseInt(page),
            "pageCount": pageCount+1,
            "pageSize": parseInt(limit),
            "count": count
        }
    }
});
});


app.get('/products/:id', async (request, response) => { 
  const id = request.params.id
  console.log(id)
  items = db.find()
  .then((item) => {
    products = item.filter(i => i._id == id)
    response.send(products)
  });
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);