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
const sectionIndicators = document.querySelector('#indicators');
const spanNbProducts = document.querySelector('#nbProducts');
const selectBrand = document.querySelector('#brand-select');
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
      //console.log(body.data.result[0].price)
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
  let nbSort = selectSort.selectedIndex;
  if (nbSort == 1) {

    products.sort(function (a, b) {
        return parseInt(a.price) - parseInt(b.price);
    });

}
if (nbSort == 2) {

    products.sort(function (b, a) {
        return parseInt(a.price) - parseInt(b.price);
    });

}
if (nbSort == 3) {

  products = products.filter((i, index) => (i.name).match("T-shirt") || (i.name).match("T-SHIRT") || (i.name).match("t-shirt"));

}
if (nbSort == 4) {

  products = products.filter((i, index) => (i.name).match("Sweater") || (i.name).match("sweat") || (i.name).match("Sweatshirt") || (i.name).match("Sweat") );

}
if (nbSort == 5) {

  products = products.filter((i, index) => (i.name).match("Pants") || (i.name).match("pantalon") );

}

  
    

 
  
  
  const template = products 
   .map(product => {
    return `
      <tr>
        <th scope="row">${product.name} 🏷️</th>
        <td>${product.brand} ™</td>
        <td>${product.price} €</td>
        <td><a href="${product.link}"><img src="${product.photo}" width="200" height="200"</a></td>
      </tr>
      `;
      })
      .join('');
    



    
  
      
  const table = `
  <table class="center">
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
  sectionProducts.innerHTML = '<h2></h2>';
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
  let products2 = currentProducts;
  const percentile = (percent, products2) => {
    products2.sort((a, b) => a.price - b.price);
    const rank = percent / 100;
    const length = products2.length;
    const indexPercentile = Math.round(rank * length);
    return products2[indexPercentile].price;
  };
  
  
  
  //console.log(currentProducts)
  
  let p90Price = percentile(90, products2);
  let p95Price = percentile(95, products2);
  let p50Price = percentile(50, products2);

  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  
    

 
  
  let template2 = `
  <tr>
    <th scope="row">${count}</th>
    <td>${p50Price} € </td>
    <td>${p90Price} €</td>
    <td>${p95Price} €</a></td>
  </tr>
  `;
  
      
    



    
  
      
  const table = `
  <table class="center">
    <caption>Indicators</caption>
    <tr>
        <th scope="col">Number of Products 🐳 </th>
        <th scope="col">P50 Price Value 🐣</th>
        <th scope="col">P90 Price Value 🐥</th>
        <th scope="col">P95 Price Value 🐤</th>
    </tr>
    ` + template2 +
     `
    
   
    
</table>
  `
  div.innerHTML = table;
  fragment.appendChild(div);
  sectionIndicators.innerHTML = '<h2></h2>';
  sectionIndicators.appendChild(fragment);

  
  
  
  //spanNbProducts.innerHTML = count;
  
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







selectSort.addEventListener('change', event => {
  (render(currentProducts, currentPagination))
});

selectBrand.addEventListener('change', event => {
  fetchProducts(currentPagination.currentPage,currentPagination.pageSize,event.target.value)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
 });


// I took this cool html/css animation from https://gscode.in/css-animated-backgrounds/
 /**
 * Ribbons Class File.
 * Creates low-poly ribbons background effect inside a target container.
 */
  ;(function(name, factory) {
    if (typeof window === 'object') {
      window[name] = factory()
    }
  })('Ribbons', function() {
    var _w = window,
      _b = document.body,
      _d = document.documentElement
  
    // random helper
    var random = function() {
      if (arguments.length === 1) {
        // only 1 argument
        if (Array.isArray(arguments[0])) {
          // extract index from array
          var index = Math.round(random(0, arguments[0].length - 1))
          return arguments[0][index]
        }
        return random(0, arguments[0]) // assume numeric
      } else if (arguments.length === 2) {
        // two arguments range
        return Math.random() * (arguments[1] - arguments[0]) + arguments[0]
      } else if (arguments.length === 4) {
        //
  
        var array = [arguments[0], arguments[1], arguments[2], arguments[3]]
        return array[Math.floor(Math.random() * array.length)]
        //return console.log(item)
      }
      return 0 // default
    }
  
    // screen helper
    var screenInfo = function(e) {
      var width = Math.max(
          0,
          _w.innerWidth || _d.clientWidth || _b.clientWidth || 0
        ),
        height = Math.max(
          0,
          _w.innerHeight || _d.clientHeight || _b.clientHeight || 0
        ),
        scrollx =
          Math.max(0, _w.pageXOffset || _d.scrollLeft || _b.scrollLeft || 0) -
          (_d.clientLeft || 0),
        scrolly =
          Math.max(0, _w.pageYOffset || _d.scrollTop || _b.scrollTop || 0) -
          (_d.clientTop || 0)
  
      return {
        width: width,
        height: height,
        ratio: width / height,
        centerx: width / 2,
        centery: height / 2,
        scrollx: scrollx,
        scrolly: scrolly
      }
    }
  
    // mouse/input helper
    var mouseInfo = function(e) {
      var screen = screenInfo(e),
        mousex = e ? Math.max(0, e.pageX || e.clientX || 0) : 0,
        mousey = e ? Math.max(0, e.pageY || e.clientY || 0) : 0
  
      return {
        mousex: mousex,
        mousey: mousey,
        centerx: mousex - screen.width / 2,
        centery: mousey - screen.height / 2
      }
    }
  
    // point object
    var Point = function(x, y) {
      this.x = 0
      this.y = 0
      this.set(x, y)
    }
    Point.prototype = {
      constructor: Point,
  
      set: function(x, y) {
        this.x = x || 0
        this.y = y || 0
      },
      copy: function(point) {
        this.x = point.x || 0
        this.y = point.y || 0
        return this
      },
      multiply: function(x, y) {
        this.x *= x || 1
        this.y *= y || 1
        return this
      },
      divide: function(x, y) {
        this.x /= x || 1
        this.y /= y || 1
        return this
      },
      add: function(x, y) {
        this.x += x || 0
        this.y += y || 0
        return this
      },
      subtract: function(x, y) {
        this.x -= x || 0
        this.y -= y || 0
        return this
      },
      clampX: function(min, max) {
        this.x = Math.max(min, Math.min(this.x, max))
        return this
      },
      clampY: function(min, max) {
        this.y = Math.max(min, Math.min(this.y, max))
        return this
      },
      flipX: function() {
        this.x *= -1
        return this
      },
      flipY: function() {
        this.y *= -1
        return this
      }
    }
  
    // class constructor
    var Factory = function(options) {
      this._canvas = null
      this._context = null
      this._sto = null
      this._width = 0
      this._height = 0
      this._scroll = 0
      this._ribbons = []
      this._options = {
        // ribbon color HSL saturation amount
        colorSaturation: '80%',
        // ribbon color HSL brightness amount
        colorBrightness: '60%',
        // ribbon color opacity amount
        colorAlpha: 0.65,
        // how fast to cycle through colors in the HSL color space
        colorCycleSpeed: 6,
        // where to start from on the Y axis on each side (top|min, middle|center, bottom|max, random)
        verticalPosition: 'center',
        // how fast to get to the other side of the screen
        horizontalSpeed: 150,
        // how many ribbons to keep on screen at any given time
        ribbonCount: 3,
        // add stroke along with ribbon fill colors
        strokeSize: 0,
        // move ribbons vertically by a factor on page scroll
        parallaxAmount: -0.5,
        // add animation effect to each ribbon section over time
        animateSections: true
      }
      this._onDraw = this._onDraw.bind(this)
      this._onResize = this._onResize.bind(this)
      this._onScroll = this._onScroll.bind(this)
      this.setOptions(options)
      this.init()
    }
  
    // class prototype
    Factory.prototype = {
      constructor: Factory,
  
      // Set and merge local options
      setOptions: function(options) {
        if (typeof options === 'object') {
          for (var key in options) {
            if (options.hasOwnProperty(key)) {
              this._options[key] = options[key]
            }
          }
        }
      },
  
      // Initialize the ribbons effect
      init: function() {
        try {
          this._canvas = document.createElement('canvas')
          this._canvas.style['display'] = 'block'
          this._canvas.style['position'] = 'fixed'
          this._canvas.style['margin'] = '0'
          this._canvas.style['padding'] = '0'
          this._canvas.style['border'] = '0'
          this._canvas.style['outline'] = '0'
          this._canvas.style['left'] = '0'
          this._canvas.style['top'] = '0'
          this._canvas.style['width'] = '100%'
          this._canvas.style['height'] = '100%'
          this._canvas.style['z-index'] = '-1'
          this._onResize()
  
          this._context = this._canvas.getContext('2d')
          this._context.clearRect(0, 0, this._width, this._height)
          this._context.globalAlpha = this._options.colorAlpha
  
          window.addEventListener('resize', this._onResize)
          window.addEventListener('scroll', this._onScroll)
          document.body.appendChild(this._canvas)
        } catch (e) {
          console.warn('Canvas Context Error: ' + e.toString())
          return
        }
        this._onDraw()
      },
  
      // Create a new random ribbon and to the list
      addRibbon: function() {
        // movement data
        var dir = Math.round(random(1, 9)) > 5 ? 'right' : 'left',
          stop = 1000,
          hide = 200,
          min = 0 - hide,
          max = this._width + hide,
          movex = 0,
          movey = 0,
          startx = dir === 'right' ? min : max,
          starty = Math.round(random(0, this._height))
  
        // asjust starty based on options
        if (/^(top|min)$/i.test(this._options.verticalPosition)) {
          starty = 0 + hide
        } else if (/^(middle|center)$/i.test(this._options.verticalPosition)) {
          starty = this._height / 2
        } else if (/^(bottom|max)$/i.test(this._options.verticalPosition)) {
          starty = this._height - hide
        }
  
        // ribbon sections data
        var ribbon = [],
          point1 = new Point(startx, starty),
          point2 = new Point(startx, starty),
          point3 = null,
          color = Math.round(random(0, 100, 200, 300)),
          delay = 0
  
        // buils ribbon sections
        while (true) {
          if (stop <= 0) break
          stop--
  
          movex = Math.round(
            (Math.random() * 1 - 0.2) * this._options.horizontalSpeed
          )
          movey = Math.round((Math.random() * 1 - 0.5) * (this._height * 0.25))
  
          point3 = new Point()
          point3.copy(point2)
  
          if (dir === 'right') {
            point3.add(movex, movey)
            if (point2.x >= max) break
          } else if (dir === 'left') {
            point3.subtract(movex, movey)
            if (point2.x <= min) break
          }
          // point3.clampY( 0, this._height );
          //console.log(Math.round(random(1, 5)))
          ribbon.push({
            // single ribbon section
            point1: new Point(point1.x, point1.y),
            point2: new Point(point2.x, point2.y),
            point3: point3,
            color: color,
            delay: delay,
            dir: dir,
            alpha: 0,
            phase: 0
          })
  
          point1.copy(point2)
          point2.copy(point3)
  
          delay += 4
          //color += 1
          //console.log('colorCycleSpeed', color)
        }
        this._ribbons.push(ribbon)
      },
  
      // Draw single section
      _drawRibbonSection: function(section) {
        if (section) {
          if (section.phase >= 1 && section.alpha <= 0) {
            return true // done
          }
          if (section.delay <= 0) {
            section.phase += 0.02
            section.alpha = Math.sin(section.phase) * 1
            section.alpha = section.alpha <= 0 ? 0 : section.alpha
            section.alpha = section.alpha >= 1 ? 1 : section.alpha
  
            if (this._options.animateSections) {
              var mod = Math.sin(1 + section.phase * Math.PI / 2) * 0.1
  
              if (section.dir === 'right') {
                section.point1.add(mod, 0)
                section.point2.add(mod, 0)
                section.point3.add(mod, 0)
              } else {
                section.point1.subtract(mod, 0)
                section.point2.subtract(mod, 0)
                section.point3.subtract(mod, 0)
              }
              section.point1.add(0, mod)
              section.point2.add(0, mod)
              section.point3.add(0, mod)
            }
          } else {
            section.delay -= 0.5
          }
          //console.log('section.color', section.color)
          var s = this._options.colorSaturation,
            l = this._options.colorBrightness,
            c =
              'hsla(' +
              section.color +
              ', ' +
              s +
              ', ' +
              l +
              ', ' +
              section.alpha +
              ' )'
  
          this._context.save()
  
          if (this._options.parallaxAmount !== 0) {
            this._context.translate(
              0,
              this._scroll * this._options.parallaxAmount
            )
          }
          this._context.beginPath()
          this._context.moveTo(section.point1.x, section.point1.y)
          this._context.lineTo(section.point2.x, section.point2.y)
          this._context.lineTo(section.point3.x, section.point3.y)
          this._context.fillStyle = c
          this._context.fill()
  
          if (this._options.strokeSize > 0) {
            this._context.lineWidth = this._options.strokeSize
            this._context.strokeStyle = c
            this._context.lineCap = 'round'
            this._context.stroke()
          }
          this._context.restore()
        }
        return false // not done yet
      },
  
      // Draw ribbons
      _onDraw: function() {
        // cleanup on ribbons list to rtemoved finished ribbons
        for (var i = 0, t = this._ribbons.length; i < t; ++i) {
          if (!this._ribbons[i]) {
            this._ribbons.splice(i, 1)
          }
        }
  
        // draw new ribbons
        this._context.clearRect(0, 0, this._width, this._height)
  
        for (
          var a = 0;
          a < this._ribbons.length;
          ++a // single ribbon
        ) {
          var ribbon = this._ribbons[a],
            numSections = ribbon.length,
            numDone = 0
  
          for (
            var b = 0;
            b < numSections;
            ++b // ribbon section
          ) {
            if (this._drawRibbonSection(ribbon[b])) {
              numDone++ // section done
            }
          }
          if (numDone >= numSections) {
            // ribbon done
            this._ribbons[a] = null
          }
        }
        // maintain optional number of ribbons on canvas
        if (this._ribbons.length < this._options.ribbonCount) {
          this.addRibbon()
        }
        requestAnimationFrame(this._onDraw)
      },
  
      // Update container size info
      _onResize: function(e) {
        var screen = screenInfo(e)
        this._width = screen.width
        this._height = screen.height
  
        if (this._canvas) {
          this._canvas.width = this._width
          this._canvas.height = this._height
  
          if (this._context) {
            this._context.globalAlpha = this._options.colorAlpha
          }
        }
      },
  
      // Update container size info
      _onScroll: function(e) {
        var screen = screenInfo(e)
        this._scroll = screen.scrolly
      }
    }
  
    // export
    return Factory
  })
  
  new Ribbons({
    colorSaturation: '50%',
    colorBrightness: '50%',
    colorAlpha: 0.8,
    colorCycleSpeed: 5,
    verticalPosition: 'random',
    horizontalSpeed: 160,
    ribbonCount: 4,
    strokeSize: 0,
    parallaxAmount: -0.2,
    animateSections: true
  })


