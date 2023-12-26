// cartScript.js

import { Cart, Payment } from './models.js';
import UserUtility from './userUtility.js';

document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.getElementById('cartContainer');
  const totalAmountElement = document.getElementById('totalAmount');
  const checkoutButton = document.getElementById('checkoutButton');

  const userUtility = new UserUtility();
  const currentUser = userUtility.getCurrentUser();

  if (!currentUser) {
    // Handle the case where there is no logged-in user
    alert('User not logged in. Please log in to use the shopping cart.');
    return;
  }

  const userId = currentUser.id; // Use the user ID from the current user
  const cart = new Cart(userId);

  // Function to create a cart item element
  function createCartItemElement(cartItem) {
    const cartItemElement = document.createElement('div');
    cartItemElement.className = 'cart-item';

    const productImage = document.createElement('img');
    productImage.src = cartItem.product.image;
    productImage.alt = cartItem.product.name;

    const productName = document.createElement('p');
    productName.textContent = cartItem.product.name;

    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${cartItem.quantity}`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(cartItem.product.id));

    cartItemElement.appendChild(productImage);
    cartItemElement.appendChild(productName);
    cartItemElement.appendChild(quantity);
    cartItemElement.appendChild(removeButton);

    return cartItemElement;
  }

  // Function to update cart items on the page
  function updateCartItems() {
    // Clear existing cart items
    cartContainer.innerHTML = '';

    // Get cart items
    const cartItems = cart.getItems();

    // Add cart items to the page
    cartItems.forEach(cartItem => {
      const cartItemElement = createCartItemElement(cartItem);
      cartContainer.appendChild(cartItemElement);
    });

    // Update total amount on the page
    updateTotalAmount();
  }

  // Function to update total amount on the page
  function updateTotalAmount() {
    const totalAmount = cart.getTotal();
    totalAmountElement.textContent = `Total: $${totalAmount.toFixed(2)}`;
  }

  // Function to remove an item from the cart
  function removeItem(productId) {
    cart.removeItem(productId);
    updateCartItems();
  }

  // Function to handle the checkout process
  function checkout() {
    const paymentMethod = new Payment(); // You can replace this with the actual payment method implementation
    cart.checkout(paymentMethod);
    //updateCartItems();
    alert('Checkout successful!');
  }

  // Update cart items on page load
  updateCartItems();

  // Add event listener for the checkout button
  checkoutButton.addEventListener('click', checkout);
});
