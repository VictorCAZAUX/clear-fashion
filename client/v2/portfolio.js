// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};
let currentBrand = "all";

// inititiqte selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
const checkReasonablePrice = document.querySelector('#reasonable-check');
const checkRecent = document.querySelector('#recently-check');
const selectSort = document.querySelector('#sort-select');
const spanNbNewProducts = document.querySelector('#nbNewProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [limit=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, limit = 12 ,brand=currentBrand) => {
  try {
    currentBrand = brand;
    
    const response = await fetch(
      `https://server-ebon-nine.vercel.app/products/search?page=${page}&limit=${limit}&brand=${brand}`
      
    );
    const body = await response.json();
      console.log(body)
    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

















/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  if (checkReasonablePrice.checked == true) {
        const reasonableFilter = products.filter(product => product.price < 100);
        products = reasonableFilter;
    }
    

 
  console.log(products.length);
  let tesst = ``;
  const template = products 
   .map(product => {
    return `
      <tr>
        <th scope="row">${product.name} 🏷️</th>
        <td>${product.brand} ™</td>
        <td>${product.price} €</td>
        <td><img src="${product.photo}" width="300" height="300"></td>
      </tr>
      `;
      })
      .join('');
    



    
  
      
  const table = `
  <table>
    <caption>Produits disponibles</caption>
    <tr>
        <th scope="col">Article</th>
        <th scope="col">Marque</th>
        <th scope="col">Prix</th>
        <th scope="col">Photo</th>
    </tr>
    ` + template +
     `
    
   
    
</table>
  `
  div.innerHTML = table;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};





/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
  
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 * @type {[type]}
 */
selectShow.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});




selectPage.addEventListener('change', event => {
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', () =>
  fetchProducts()
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination))
);

checkReasonablePrice.addEventListener('change', event => {
  (render(currentProducts, currentPagination))
});





selectSort.addEventListener('change', event => {
  (render(currentProducts, currentPagination))
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize,event.target.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
 });


