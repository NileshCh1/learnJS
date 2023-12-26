// Cart class to manage the items in the user's shopping cart
class Cart {
    constructor(userId) {
      this.userId = userId;
      this.items = this.loadCartFromSession();
    }
  
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(item => item.product.id === product.id);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({ product, quantity });
      }
  
      this.updateSession();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateSession();
    }
  
    getItems() {
      return this.items;
    }
  
    getTotal() {
      return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
      window.sessionStorage.setItem(`cart_${this.userId}`, JSON.stringify(this.items));
    }
  
    loadCartFromSession() {
      // Use the userId to retrieve the cart data per user
      const storedCart = window.sessionStorage.getItem(`cart_${this.userId}`);
      if (!storedCart) {
        return Cart.createEmptyCart(this.userId); // Use Cart.createEmptyCart
      }
      return storedCart ? JSON.parse(storedCart) : [];
    }
  
    static createEmptyCart(userId) {
      // Create an empty cart for the user
      const emptyCart = { userId, items: [] };
      window.sessionStorage.setItem(`cart_${userId}`, JSON.stringify(emptyCart.items));
      return emptyCart;
    }
  }
  
  export default Cart;
  