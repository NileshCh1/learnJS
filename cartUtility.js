import UserUtility from "./userUtility.js";

// Cart class to manage the items in the user's shopping cart
class cartUtility {
  constructor(userId) {
    this.userId = userId;
    this.items = this.loadCartFromSession();
  }

  addItem(product, quantity = 1) {

    //get current user check if it's not null and get the id
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();
    if (currentUser == null) {
        alert("User not logged in. Please log in to use the shopping cart.");
        return;
    }
    this.userId = currentUser.id;
    this.items = this.loadCartFromSession();
    const existingItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }

    this.updateSession();
  }

  removeItem(productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
    this.updateSession();
  }

  getItems() {
    return this.items;
  }

  getTotal() {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  checkout(paymentMethod) {
    // Perform checkout logic, such as processing the payment
    paymentMethod.processPayment(this.getTotal());
    // Clear the cart after successful checkout
    this.items = [];
    this.updateSession();
  }

  updateSession() {
    // Use the userId to store the cart data per user
    window.sessionStorage.setItem(
      `cart_${this.userId}`,
      JSON.stringify(this.items)
    );
  }

  loadCartFromSession() {
    // Use the userId to retrieve the cart data per user
    const storedCart = window.sessionStorage.getItem(`cart_${this.userId}`);

    //check if storedCart is null, if so, create an empty cart

    if (!storedCart) {
      return Cart.createEmptyCart(this.userId); // Use Cart.createEmptyCart
    }

    return storedCart;
  }

  static createEmptyCart(userId) {
    // Create an empty cart for the user
    const emptyCart = { userId, items: [] };
    window.sessionStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(emptyCart.items)
    );
    return emptyCart;
  }
}

export default cartUtility;
