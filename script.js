const products = [
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with adjustable DPI.',
    price: 29.99,
    image: '/Imagenes/mouseinalambrico.webp',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches.',
    price: 89.99,
    image: '/Imagenes/mech.keyboard.jpeg',
  },
  {
    name: 'Gaming Headset',
    description: 'Surround sound gaming headset with noise-cancelling microphone.',
    price: 59.99,
    image: '/Imagenes/headset.jpeg',
  },
  {
    name: '27-inch Monitor',
    description: '4K UHD monitor with IPS display and 144Hz refresh rate.',
    price: 329.99,
    image: '/Imagenes/monitor.jpeg',
  },
  {
    name: 'Laptop Stand',
    description: 'Adjustable aluminum laptop stand for ergonomic work setup.',
    price: 39.99,
    image: '/Imagenes/laptop.stand.jpg',
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    price: 24.99,
    image: '/Imagenes/usbchub.jpeg',
  },
  {
    name: 'External SSD',
    description: 'Portable external SSD with 1TB storage and USB 3.1 interface.',
    price: 129.99,
    image: '/Imagenes/ssd.jpg',
  },
  {
    name: 'Smartphone Stand',
    description: 'Adjustable smartphone stand with 360-degree rotation.',
    price: 19.99,
    image: '/Imagenes/phonestand.jpeg',
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 10-hour battery life.',
    price: 49.99,
    image: '/Imagenes/btspeaker.jpeg',
  },
  {
    name: 'Webcam',
    description: '1080p HD webcam with built-in microphone and privacy cover.',
    price: 34.99,
    image: '/Imagenes/webcam.jpg',
  },
  {
    name: 'Wireless Charger',
    description: 'Fast wireless charger with Qi compatibility.',
    price: 25.99,
    image: '/Imagenes/wirelesscharg.webp',
  },
  {
    name: 'Noise-Cancelling Headphones',
    description: 'Over-ear noise-cancelling headphones with Bluetooth connectivity.',
    price: 199.99,
    image: '/Imagenes/noisecanc.headphones.jpeg',
  },
  {
    name: 'Smartwatch',
    description: 'Smartwatch with heart rate monitor and GPS.',
    price: 149.99,
    image: '/Imagenes/smartwatch.jpg',
  },
];
let filteredProducts = products;

function filterList() {
  const name = document.getElementById('buscador').value;

  filteredProducts = products.filter((product) => product.name.toLowerCase().includes(name));
  displayProducts();
}

function handleDropdownChange() {
  const dropdownValue = document.getElementById('dropdown1').value;

  switch (dropdownValue) {
    case 'op1':
      location.reload();
      break;
    case 'op2':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'op3':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
  }

  displayProducts();
}

/**function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Cierra el dropdown si el usuario hace clic fuera de él
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}*/

function newProduct() {
  const name = document.getElementById('newProductName').value;
  const description = document.getElementById('newProductDescription').value;
  const price = parseFloat(document.getElementById('newProductPrice').value);
  const image = document.getElementById('newProductImage').value;

  if (name && description && !isNaN(price) && image) {
    const newProduct = {
      name: name,
      description: description,
      price: price,
      image: image,
    };

    products.push(newProduct);

    filteredProducts = products;
    displayProducts();

    document.getElementById('newProductName').value = '';
    document.getElementById('newProductDescription').value = '';
    document.getElementById('newProductPrice').value = '';
    document.getElementById('newProductImage').value = '';
  } else {
    alert('Por favor, completa todos los campos.');
  }
}


function displayProducts() {
  const cardContainer = document.getElementById('productCard');
  cardContainer.innerHTML = '';

  if (filteredProducts.length === 0) {
    cardContainer.outerHTML = `
    <div id="itemNotFound">
      <h3>
        Sorry, the product that you searched does not exists :(
      </h3>
    </div>
    `;
  } else {
    filteredProducts.forEach((product, index) => {
      const productCard = `
    <div class="card" onclick="showDetails(this.innerHTML)">
      <div class="card-image">
            <figure class="image is-4by3">
              <img
                id="product-${index}"
                src="${product.image}"
                alt="${product.name}"
              />
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">${product.name}</p>
                <p class="subtitle is-6">$${product.price}</p>
              </div>
            </div>
        
            <div class="content">
              "${product.description}"
              <br/>
            </div>
          </div>
    </div>
    `;
      cardContainer.innerHTML += productCard;
    });
  }

addDragAndDropFunctionality();
}


function addDragAndDropFunctionality() {
  const draggableItems = document.querySelectorAll('.card');
  const shop = document.getElementById('shop');

  draggableItems.forEach((item) => {
    item.addEventListener('dragstart', function(e) {
      e.dataTransfer.setData('text', e.target.id);
    });
  });

  shop.addEventListener('dragover', function(e) {
    e.preventDefault();
  });

  shop.addEventListener('drop', function(e) {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text');
    const draggedElement = document.getElementById(productId);
    
    // Crea una copia del producto arrastrado
    const clonedElement = draggedElement.cloneNode(true);
    clonedElement.style.cursor = 'default'; // Deshabilita el arrastre en la canasta
    clonedElement.setAttribute('draggable', 'false'); // Deshabilita arrastrar en la canasta

    // Añade la copia a la canasta visual y almacena en localStorage
    addToBasket(productId);
  });
}

// Almacena los productos en la canasta en localStorage
function addToBasket(productId) {
  const productIndex = productId.split('-')[1];
  const product = products[productIndex];

  let basket = JSON.parse(localStorage.getItem('basket')) || [];
  basket.push(product);
  localStorage.setItem('basket', JSON.stringify(basket));
}

// Redirige a la página de la canasta
function goToBasket() {
  window.location.href = "basket.html";
}

// Initialize display with all products
displayProducts();

function showDetails(rawProduct) {
  const detailsModal = document.getElementById('modalProductDetails');
  detailsModal.classList.add('is-active');

  const product = document.createElement('div');
  product.innerHTML = rawProduct;

  const name = product.querySelector('.title.is-4').textContent;
  const price = product.querySelector('.subtitle.is-6').textContent;
  const description = product.querySelector('.content').textContent;
  const imageUrl = product.querySelector('img').src;

  console.log('Product Name:', name);
  console.log('Product Price:', price);
  console.log('Product Description:', description);
  console.log('Product Image URL:', imageUrl);

  const modalContent = document.getElementById('modalProductDetailsContent');
  modalContent.innerHTML = `
    <div class="box">
      <h2>Name</h2>
      <p>${name}</p>
      <h2>Description</h2>
      <p>${description}</p>
      <h2>Price</h2>
      <p>${price}</p>
      <figure class="image is-4by3">
        <img
          src="${imageUrl}"
          alt="${name}"
        />
      </figure>
    </div>
  `;
}

function showNewProduct(){
  const detailsModal = document.getElementById('modalNewProduct');
  detailsModal.classList.add("is-active");
}

function closeNewProductModal(){
  const detailsModal = document.getElementById('modalNewProduct');
  detailsModal.classList.remove("is-active");
}

function closeDetailsModal(){
  const detailsModal = document.getElementById('modalProductDetails');
  detailsModal.classList.remove("is-active");
}