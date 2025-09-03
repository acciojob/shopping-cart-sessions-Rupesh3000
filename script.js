// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

const addToCart = () => {
  const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      const product = products.find((p) => p.id == productId);
      // Add to sessionStorage
      let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cart.push(product); // Allow duplicates as test expects Product 1 twice
      sessionStorage.setItem("cart", JSON.stringify(cart));
      // Render to cart list
      renderCart(product);
    });
  });
};

const renderCart = (product) => {
  const li = document.createElement("li");
  li.innerHTML = `${product.name} - $${product.price}`;
  cartList.appendChild(li);
};

function clearCart() {
  cartList.innerHTML = "";
  sessionStorage.setItem("cart", JSON.stringify([])); // Changed to clear only cart key
}

// Render cart from sessionStorage on load
function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.forEach((product) => renderCart(product));
}

// Call on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  loadCart(); // Load saved cart
  addToCart();
  const clearCartBtn = document.getElementById("clear-cart-btn");
  clearCartBtn.addEventListener("click", clearCart);
});
