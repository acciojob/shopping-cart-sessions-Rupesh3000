// This is the boilerplate code given for you
// You can modify this code
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
      cart.push(product);
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

// Call on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(); // Existing function to render products
  addToCart();
});



function clearCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = ""; // Clear cart list
  // sessionStorage.setItem("cart", JSON.stringify([])); 
  window.sessionStorage.clear()
}

// Add event listener for clear cart button
document.addEventListener("DOMContentLoaded", () => {
  const clearCartBtn = document.getElementById("clear-cart-btn");
  clearCartBtn.addEventListener("click", clearCart);
});
