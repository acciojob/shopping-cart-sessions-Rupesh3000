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

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current cart
  const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id == productId);
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart.push(product); // Allow duplicates as test expects
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart(); // Update cart display
}

// Remove item from cart (not required by test, but included as per boilerplate)
function removeFromCart(productId) {
  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != productId); // Remove first matching product
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cartList.innerHTML = "";
  sessionStorage.setItem("cart", JSON.stringify([]));
}

// Initial setup
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
  // Add event listeners for add-to-cart buttons
  const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productId = e.target.dataset.id;
      addToCart(productId);
    });
  });
  // Add event listener for clear cart
  const clearCartBtn = document.getElementById("clear-cart-btn");
  clearCartBtn.addEventListener("click", clearCart);
});
