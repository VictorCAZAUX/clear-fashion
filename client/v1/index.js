// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

console.log('🚀 This is it.');

const MY_FAVORITE_BRANDS = [{
  'name': 'Hopaal',
  'url': 'https://hopaal.com/'
}, {
  'name': 'Loom',
  'url': 'https://www.loom.fr'
}, {
  'name': 'ADRESSE',
  'url': 'https://adresse.paris/'
}];

console.table(MY_FAVORITE_BRANDS);
console.log(MY_FAVORITE_BRANDS[0]);



/**
 * 🌱
 * Let's go with a very very simple first todo
 * Keep pushing
 * 🌱
 */

// 🎯 TODO: The cheapest t-shirt
// 0. I have 3 favorite brands stored in MY_FAVORITE_BRANDS variable
// 1. Create a new variable and assign it the link of the cheapest t-shirt
// I can find on these e-shops
// 2. Log the variable

var cheapest_shirt_hoopla = "https://hopaal.com/collections/homme/products/classique-noir-t-shirt-homme?variant=39629285949624";
console.log(cheapest_shirt_hoopla)



/**
 * 👕
 * Easy 😁?
 * Now we manipulate the variable `marketplace`
 * `marketplace` is a list of products from several brands e-shops
 * The variable is loaded by the file data.js
 * 👕
 */


const lengthmarketplace = marketplace.length;
console.log(lengthmarketplace)


// 🎯 TODO: Number of products
// 1. Create a variable and assign it the number of products
// 2. Log the variable


// 🎯 TODO: Brands name
// 1. Create a variable and assign it the list of brands name only
// 2. Log the variable
// 3. Log how many brands we have

var brands_name_set = new Set(marketplace.map(element => element.brand));
var brands_name = Array.from(brands_name_set);
console.log(`Brands name : ${brands_name}`);
console.log(`Number of brands: ${brands_name.length}`);

// 🎯 TODO: Sort by price
// 1. Create a function to sort the marketplace products by price
// 2. Create a variable and assign it the list of products by price from lowest to highest


function sortbyprice(tableau)
{
  tableau.sort((a, b) => b.price - a.price);

  tableau.forEach((e) => {
      console.log(`${e.price} ${e.name} ${e.link}`);
  });
}

//sortbyprice(marketplace);





// 🎯 TODO: Sort by date
// 1. Create a function to sort the marketplace objects by products date
// 2. Create a variable and assign it the list of products by date from recent to old
// 3. Log the variable

function sortbydate(tableau)
{
  tableau.sort((a, b) => b.date - a.date);

  tableau.forEach((e) => {
      console.log(`${e.date} ${e.name} ${e.link}`);
  });
}

//sortbydate(marketplace);


// 🎯 TODO: Filter a specific price range
// 1. Filter the list of products between 50€ and 100€
// 2. Log the list

marketplace.forEach((e) => {
  if(e.price > 50 & e.price < 100)
  {
    console.log(`${e.price} $ ${e.name} ${e.link}`)
  }
});


// 🎯 TODO: Average Basket
// 1. Determine the average basket of the marketplace
// 2. Log the average

var total = 0;
marketplace.forEach((e) => {
  total += e.price;
});
var average = total/140;
console.log(`Le prix moyen d'un article est : ${average}$`);



/**
 * 🏎
 * We are almost done with the `marketplace` variable
 * Keep pushing
 * 🏎
 */

// 🎯 TODO: Products by brands
// 1. Create an object called `brands` to manipulate products by brand name
// The key is the brand name
// The value is the array of products
//
// Example:
// const brands = {
//   'brand-name-1': [{...}, {...}, ..., {...}],
//   'brand-name-2': [{...}, {...}, ..., {...}],
//   ....
//   'brand-name-n': [{...}, {...}, ..., {...}],
// };
//

const brands = {};
brands_name.forEach(name => {
  brands[name] = [];
  marketplace.forEach(item => {
    if(name == item.brand){
      brands[name].push(item);
    }
  });
});

// 2. Log the variable
console.log(brands);
// 3. Log the number of products by brands

for(var brand in brands){
  console.log(`brand: ${brand}, number of products : ${brands[brand].length}`)
};


// 🎯 TODO: Sort by price for each brand
// 1. For each brand, sort the products by price, from highest to lowest
// 2. Log the sort

console.log("TODO BRANDS SORT BY PRICE");


for(var brand in brands) {
  sortbyprice(brands[brand])
};



// 🎯 TODO: Sort by date for each brand
// 1. For each brand, sort the products by date, from old to recent
// 2. Log the sort


for(var brand in brands) {
  sortbydate(brands[brand])
};


/**
 * 💶
 * Let's talk about money now
 * Do some Maths
 * 💶
 */

// 🎯 TODO: Compute the p90 price value
// 1. Compute the p90 price value of each brand
// The p90 value (90th percentile) is the lower value expected to be exceeded in 90% of the products

console.log("TODO P90");

const sortedBrandsbyPrice = brands;
for(var brand in sortedBrandsbyPrice) {
  brands[brand].sort(function(a,b){
    return b.price-a.price;
  });
}



var rank = 0.09;
for(var brand in sortedBrandsbyPrice) {
  
  var percentile = sortedBrandsbyPrice[brand].length;
  var indexpercentile = Math.round(rank*percentile)
  console.log(`brand : ${brand} , p90 : ${sortedBrandsbyPrice[brand][indexpercentile].price}`);
};


/**
 * 🧥
 * Cool for your effort.
 * It's almost done
 * Now we manipulate the variable `COTELE_PARIS`
 * `COTELE_PARIS` is a list of products from https://coteleparis.com/collections/tous-les-produits-cotele
 * 🧥
 */

const COTELE_PARIS = [
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-gris',
    price: 45,
    name: 'BASEBALL CAP - TAUPE',
    uuid: 'af07d5a4-778d-56ad-b3f5-7001bf7f2b7d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-navy',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - NAVY',
    uuid: 'd62e3055-1eb2-5c09-b865-9d0438bcf075',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-fuchsia',
    price: 110,
    name: 'VESTE - FUCHSIA',
    uuid: 'da3858a2-95e3-53da-b92c-7f3d535a753d',
    released: '2020-11-17'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-baseball-cap-camel',
    price: 45,
    name: 'BASEBALL CAP - CAMEL',
    uuid: 'b56c6d88-749a-5b4c-b571-e5b5c6483131',
    released: '2020-10-19'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-beige',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BEIGE',
    uuid: 'f64727eb-215e-5229-b3f9-063b5354700d',
    released: '2021-01-11'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-veste-rouge-vermeil',
    price: 110,
    name: 'VESTE - ROUGE VERMEIL',
    uuid: '4370637a-9e34-5d0f-9631-04d54a838a6e',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/la-chemise-milleraie-bordeaux',
    price: 85,
    name: 'CHEMISE MILLERAIE MIXTE - BORDEAUX',
    uuid: '93d80d82-3fc3-55dd-a7ef-09a32053e36c',
    released: '2020-12-21'
  },
  {
    link: 'https://coteleparis.com//collections/tous-les-produits-cotele/products/le-bob-dylan-gris',
    price: 45,
    name: 'BOB DYLAN - TAUPE',
    uuid: 'f48810f1-a822-5ee3-b41a-be15e9a97e3f',
    released: '2020-12-21'
  }
]

// 🎯 TODO: New released products
// // 1. Log if we have new products only (true or false)
// // A new product is a product `released` less than 2 weeks.


// 🎯 TODO: Reasonable price
// // 1. Log if coteleparis is a reasonable price shop (true or false)
// // A reasonable price if all the products are less than 100€

var reasonable = 1;
COTELE_PARIS.forEach((e) => {
  if(e.price > 100)
  {
    reasonable = 0;
  }
})
if(reasonable == 0)
{
  console.log("Cotele paris is not a reasonable price shop");
}
else
{
  console.log("Cotele paris is a reasonable price shop");
}


// 🎯 TODO: Find a specific product
// 1. Find the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the product

COTELE_PARIS.forEach((e) => {
  if(e.uuid == "b56c6d88-749a-5b4c-b571-e5b5c6483131")
  {
    console.log(e.price,e.link,e.name,e.uuid,e.released);
  }
})

// 🎯 TODO: Delete a specific product
// 1. Delete the product with the uuid `b56c6d88-749a-5b4c-b571-e5b5c6483131`
// 2. Log the new list of product

var indexx = COTELE_PARIS.findIndex(isLargeNumber);
COTELE_PARIS.forEach((e) => {
  if(e.uuid == "b56c6d88-749a-5b4c-b571-e5b5c6483131")
  {
    indexx = array1.findIndex(isLargeNumber)
  }
})



// 🎯 TODO: Save the favorite product
let blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// we make a copy of blueJacket to jacket
// and set a new property `favorite` to true
let jacket = blueJacket;

jacket.favorite = true;

// 1. Log `blueJacket` and `jacket` variables
// 2. What do you notice?

blueJacket = {
  'link': 'https://coteleparis.com/collections/tous-les-produits-cotele/products/la-veste-bleu-roi',
  'price': 110,
  'uuid': 'b4b05398-fee0-4b31-90fe-a794d2ccfaaa'
};

// 3. Update `jacket` property with `favorite` to true WITHOUT changing blueJacket properties





/**
 * 🎬
 * The End
 * 🎬
 */

// 🎯 TODO: Save in localStorage
// 1. Save MY_FAVORITE_BRANDS in the localStorage
// 2. log the localStorage
