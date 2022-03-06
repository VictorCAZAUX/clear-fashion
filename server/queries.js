var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://victor:T7zXLcpmf6p73vcO@Cluster0.miqnt.mongodb.net/clear-fashion?retryWrites=true&w=majority';

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Cluster0");
  //var query = { brand : "montlimart" };
  var query = { price : {"$lte" : 100} };
  
  dbo.collection("products").find(query).toArray(function(err, result) {
  //dbo.collection("products").find().sort({ "price": -1 }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});