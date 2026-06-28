let products = [];
let cart = JSON.parse(localStorage.getItem('kkr_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => {
      products = data;
      renderProducts();
      renderCart();
    });
});

function renderProducts() {
  const grid = document.getElementById('products-grid');
  grid.innerHTML = products.map(p => `
    <article style="background: var(--bg-color); border: 4px solid var(--text-color); display: flex; flex-direction: column; text-align: center; position: relative;">
      ${p.offerTag ? `<div style="position: absolute; top: 0; left: 0; background: var(--secondary); padding: 0.3rem 0.8rem; font-family: var(--font-heading); border-bottom: 4px solid var(--text-color); border-right: 4px solid var(--text-color);">${p.offerTag}</div>` : ''}
      <img src="${p.image}" alt="${p.name}" style="width: 100%; border-bottom: 4px solid var(--text-color);">
      <div style="padding: 1rem;">
        <h3 style="font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 0.5rem;">${p.name}</h3>
        <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 1rem;">
          ₹${p.price} <span style="text-decoration: line-through; color: #888; font-size: 0.9rem; margin-left: 0.5rem;">₹${p.originalPrice}</span>
        </div>
        <button onclick="addToCart(${p.id})" class="btn" style="width: 100%;">ADD TO CART</button>
      </div>
    </article>
  `).join('');
}

function addToCart(productId) {
  const existing = cart.find(item => item.productId === productId);
  if (existing) existing.quantity++;
  else cart.push({ productId, quantity: 1 });
  saveAndRenderCart();
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.productId !== productId);
    }
  }
  saveAndRenderCart();
}

function saveAndRenderCart() {
  localStorage.setItem('kkr_cart', JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartContainer = document.getElementById('cart-items');
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<div style="font-weight: bold;">CART IS EMPTY.</div>';
    document.getElementById('cart-total').innerText = '₹0';
    return;
  }

  cartContainer.innerHTML = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    if(!p) return '';
    total += (p.price * item.quantity);
    return `
      <div style="border: 2px solid var(--text-color); padding: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
        <div style="font-family: var(--font-heading); font-size: 0.9rem;">${p.name}</div>
        <div style="display: flex; align-items: center; gap: 0.5rem; font-weight: bold;">
          <button onclick="updateQuantity(${item.productId}, -1)" style="cursor: pointer; background: var(--text-color); color: #fff; border: none; padding: 0.2rem 0.5rem;">-</button>
          ${item.quantity}
          <button onclick="updateQuantity(${item.productId}, 1)" style="cursor: pointer; background: var(--text-color); color: #fff; border: none; padding: 0.2rem 0.5rem;">+</button>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('cart-total').innerText = `₹${total}`;
}

function openCheckout() {
  if (cart.length === 0) return alert("CART IS EMPTY!");
  document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
  document.getElementById('checkout-modal').style.display = 'none';
  document.getElementById('checkout-form-step').style.display = 'block';
  document.getElementById('checkout-payment-step').style.display = 'none';
}

function showPaymentStep() {
  const name = document.getElementById('cName').value;
  const phone = document.getElementById('cPhone').value;
  const address = document.getElementById('cAddress').value;

  if (!name || !phone || !address) return alert("FILL ALL DELIVERY DETAILS!");

  const summaryList = document.getElementById('checkout-summary-list');
  summaryList.innerHTML = cart.map(item => {
    const p = products.find(prod => prod.id === item.productId);
    return `<li>${item.quantity}x - ${p.name}</li>`;
  }).join('');

  document.getElementById('checkout-form-step').style.display = 'none';
  document.getElementById('checkout-payment-step').style.display = 'block';
  document.getElementById('pay-amount').innerText = document.getElementById('cart-total').innerText;
}

function submitOrder() {
  const payload = {
    name: document.getElementById('cName').value,
    phone: document.getElementById('cPhone').value,
    address: document.getElementById('cAddress').value,
    cart: cart
  };

  fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`SUCCESS! TEAM KKR HAS RECEIVED YOUR ORDER.\n\nORDER ID: ${data.orderId}`);
      cart = []; 
      saveAndRenderCart();
      closeCheckout();
    }
  })
  .catch(err => alert("ERROR PROCESSING ORDER."));
}