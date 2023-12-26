import UserUtility from "./userUtility.js";

// Product class representing each product in the store
export class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = new URL(image);
  }
}

export class Cart {
  constructor(userId) {
    this.userId = userId;
    this.items = this.loadCartFromSession();
  }

  addItem(product, quantity = 1) {
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
    paymentMethod.processPayment(this.getTotal());
    this.items = [];
    this.updateSession();
  }

  updateSession() {
    window.sessionStorage.setItem(
      `cart_${this.userId}`,
      JSON.stringify(this.items)
    );
  }

  loadCartFromSession() {
    const storedCart = window.sessionStorage.getItem(`cart_${this.userId}`);

    if (!storedCart) {
      Cart.createEmptyCart(this.userId);
      storedCart = window.sessionStorage.getItem(`cart_${this.userId}`);
    }

    this.items = storedCart ? JSON.parse(storedCart) : [];
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();
    this.userId = currentUser.id;

    return this.items;
  }

  static createEmptyCart(userId) {
    const emptyCart = { userId, items: [] };
    window.sessionStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(emptyCart.items)
    );
    return emptyCart;
  }
}

export default Cart;

// Payment class to handle different payment methods
export class Payment {
  processPayment(amount) {
    // Placeholder method for processing payment
    console.log(`Processing payment of $${amount}`);
    // Additional payment processing logic can be added here
  }
}
