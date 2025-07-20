document.addEventListener('DOMContentLoaded', function() {
  // Product data
  const products = [
    {
      id: 1,
      name: "Jinro Chamisul Fresh SOJU",
      category: "drinks",
      price: 69.00,
      oldPrice: 79.00,
      rating: 4.5,
      reviews: 128,
      badge: "Best Seller",
      image: "img/soju.jpg"
    },
    {
      id: 2,
      name: "Buldak Carbonara Hot Chicken Flavor Ramen",
      category: "ramen",
      price: 73.00,
      rating: 4,
      reviews: 96,
      badge: "Hot",
      badgeClass: "hot",
      image: "img/carbonara.jpg"
    },
    {
      id: 3,
      name: "Binggrae coffee",
      category: "drinks",
      price: 53.00,
      rating: 5,
      reviews: 215,
      image: "img/kape.jpg"
    },
    {
      id: 4,
      name: "Hansung Luncheon Meat",
      category: "meats",
      price: 99.00,
      rating: 4.5,
      reviews: 78,
      image: "img/lunchon.png"
    },
    {
      id: 5,
      name: "Binggrae Banana Milk Drink",
      category: "drinks",
      price: 59.00,
      rating: 5,
      reviews: 342,
      badge: "New",
      badgeClass: "new",
      image: "img/banana  .jpg"
    },
    {
      id: 6,
      name: "Buldak Hot Carbocream Flavor",
      category: "ramen",
      price: 76.00,
      rating: 4,
      reviews: 64,
      image: "img/carbocream.jpg"
    },
    {
      id: 7,
      name: "Korean BBQ Samgyupsal",
      category: "meats",
      price: 299.00,
      oldPrice: 349.00,
      rating: 4.5,
      reviews: 187,
      badge: "Best Seller",
      image: "img/samg.jpg"
    },
    {
      id: 8,
      name: "Korean Rice Cakes",
      category: "snacks",
      price: 89.00,
      rating: 4,
      reviews: 92,
      image: "img/rice.jpg"
    }
  ];

  // DOM Elements
  const productGrid = document.querySelector('.product-grid');
  const tabs = document.querySelectorAll('.tab');
  const cartCount = document.querySelector('.cart-count');
  const cartIcon = document.querySelector('.cart-icon');
  const notification = document.getElementById('notification');
  const newsletterForm = document.getElementById('newsletterForm');
  const searchInput = document.querySelector('.search-input');
  const searchIcon = document.querySelector('.search-icon');

  // Initialize cart
  let cart = [];
  let count = 0;

  // Render products
  function renderProducts(filter = 'all') {
    productGrid.innerHTML = '';
    const filteredProducts = filter === 'all' 
      ? products 
      : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.dataset.category = product.category;
      
      let badgeHTML = '';
      if (product.badge) {
        badgeHTML = `<div class="product-badge ${product.badgeClass || ''}">${product.badge}</div>`;
      }
      
      let oldPriceHTML = '';
      if (product.oldPrice) {
        oldPriceHTML = `<span class="old-price">₱${product.oldPrice.toFixed(2)}</span>`;
      }
      
      const stars = renderStars(product.rating);
      
      productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="rating">
            ${stars}
            <span>(${product.reviews})</span>
          </div>
          <p class="price">₱${product.price.toFixed(2)} ${oldPriceHTML}</p>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      `;
      
      productGrid.appendChild(productCard);
    });
    
    // Add event listeners to new add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  // Render star ratings
  function renderStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    
    return stars;
  }

  // Add to cart function
  function addToCart(e) {
    const productId = parseInt(e.target.closest('.add-to-cart').dataset.id);
    const product = products.find(p => p.id === productId);
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }
    
    count++;
    cartCount.textContent = count;
    
    // Add animation to cart icon
    cartIcon.classList.add('animate');
    setTimeout(() => {
      cartIcon.classList.remove('animate');
    }, 500);
    
    // Change button style temporarily
    const button = e.target.closest('.add-to-cart');
    button.classList.add('added');
    button.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
    
    setTimeout(() => {
      button.classList.remove('added');
      button.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
    }, 2000);
    
    // Show notification
    showNotification(`${product.name} added to cart`);
  }

  // Show notification
  function showNotification(message) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Filter products by category
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      renderProducts(category);
      
      // Smooth scroll to products section
      document.querySelector('#products').scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Newsletter form submission
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input').value;
    
    // In a real app, you would send this to your server
    console.log('Subscribed with email:', email);
    showNotification('Thanks for subscribing!');
    this.reset();
  });

  // Search functionality
  searchIcon.addEventListener('click', searchProducts);
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchProducts();
    }
  });

  function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm.trim() === '') {
      renderProducts();
      return;
    }
    
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) || 
      product.category.toLowerCase().includes(searchTerm)
    );
    
    productGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
      productGrid.innerHTML = '<p class="no-results">No products found. Try a different search term.</p>';
      return;
    }
    
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      let badgeHTML = '';
      if (product.badge) {
        badgeHTML = `<div class="product-badge ${product.badgeClass || ''}">${product.badge}</div>`;
      }
      
      let oldPriceHTML = '';
      if (product.oldPrice) {
        oldPriceHTML = `<span class="old-price">₱${product.oldPrice.toFixed(2)}</span>`;
      }
      
      const stars = renderStars(product.rating);
      
      productCard.innerHTML = `
        ${badgeHTML}
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
          <h3>${product.name}</h3>
          <div class="rating">
            ${stars}
            <span>(${product.reviews})</span>
          </div>
          <p class="price">₱${product.price.toFixed(2)} ${oldPriceHTML}</p>
          <button class="add-to-cart" data-id="${product.id}">
            <i class="fas fa-cart-plus"></i> Add to Cart
          </button>
        </div>
      `;
      
      productGrid.appendChild(productCard);
    });
    
    // Add event listeners to new add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', addToCart);
    });
  }

  // Countdown timer
  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  setInterval(updateTimer, 1000);
  updateTimer();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Login button functionality
  document.querySelector('.login-btn').addEventListener('click', function() {
    showNotification('Login feature coming soon!');
  });

  // Cart icon click
  cartIcon.addEventListener('click', function() {
    showNotification(`You have ${count} items in your cart`);
  });

  // Initialize the page
  renderProducts();
});