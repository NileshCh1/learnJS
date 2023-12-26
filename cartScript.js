// cartScript.js
import { Payment } from './models.js';
import Cart from './cartUtility.js';

document.addEventListener("DOMContentLoaded", function() {
  const Cart = new Cart();
  const cartContainer = document.getElementById('cartContainer');
  const totalAmount = document.getElementById('totalAmount');
  const checkoutButton = document.getElementById('checkoutButton');

  // Display cart items on the page
  const cartItems = cartUtility.getCartItems();
  cartItems.forEach(item => {
    const cartItemElement = createCartItemElement(item);
    cartContainer.appendChild(cartItemElement);
  });

  // Display total amount
  totalAmount.textContent = `Total: $${cartUtility.getTotal().toFixed(2)}`;

  // Add event listener for checkout button
  checkoutButton.addEventListener('click', () => checkout(cartItems));
});

function createCartItemElement(item) {
  const cartItem = document.createElement('div');
  cartItem.className = 'cart-item';

  const image = document.createElement('img');
  image.src = item.product.image;
  image.alt = item.product.name;

  const itemName = document.createElement('p');
  itemName.textContent = item.product.name;

  const itemPrice = document.createElement('p');
  itemPrice.textContent = `$${item.product.price.toFixed(2)}`;

  const itemQuantity = document.createElement('p');
  itemQuantity.textContent = `Quantity: ${item.quantity}`;

  cartItem.appendChild(image);
  cartItem.appendChild(itemName);
  cartItem.appendChild(itemPrice);
  cartItem.appendChild(itemQuantity);

  return cartItem;
}

function checkout(cartItems) {
  const cartUtility = new CartUtility();
  const cart = new Cart(cartItems);

  const paymentMethod = new Payment(); // You may extend this to support different payment methods

  // Perform checkout logic
  cart.checkout(paymentMethod);

  // Clear the cart
  cartUtility.clearCart();

  // Display a confirmation message (You can customize this part)
  alert('Checkout successful! Thank you for shopping with us.');

  // Redirect to the home page or any other desired page
  window.location.href = './index.html';
}
