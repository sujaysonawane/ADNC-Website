// ============================================
// ADNC Shared JavaScript - main.js
// ============================================

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function addToCart(product) {
  let existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} added to cart!`);
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = total;
  });
}

// Wishlist
function toggleWishlist(product) {
  let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const exists = wishlist.some(item => item.id === product.id);

  if (exists) {
    wishlist = wishlist.filter(item => item.id !== product.id);
    showToast('Removed from Wishlist');
  } else {
    wishlist.push(product);
    showToast('Added to Wishlist');
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Toast Notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast show';
  toast.innerHTML = `<i class="fas fa-check-circle" style="color:#22c55e;margin-right:12px;"></i>${message}`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// Theme Toggle
function initTheme() {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
}

document.getElementById('themeToggle')?.addEventListener('click', e => {
  e.preventDefault();
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Hamburger Menu
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('active');
    });
  }
  if (mobileMenu) {
    mobileMenu.querySelector('.close-menu')?.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  }
}

// Run on every page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initTheme();
  initMobileMenu();
});