
document.addEventListener('DOMContentLoaded', function() {
  function updateTimer() {
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const diff = endOfDay - now;
    
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('hours').textContent = Math.floor(hours).toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
  }
  
  setInterval(updateTimer, 1000);
  updateTimer();
  

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartCount = document.querySelector('.cart-count');
  let count = 0;
  
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      count++;
      cartCount.textContent = count;
      
      const cartIcon = document.querySelector('.cart-icon');
      cartIcon.classList.add('animate');
      setTimeout(() => {
        cartIcon.classList.remove('animate');
      }, 500);
    });
  });

  const tabs = document.querySelectorAll('.tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
  

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
});