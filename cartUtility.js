import UserUtility from "./userUtility.js";
import { Cart } from "./models.js";

class CartUtility {
  static addItemToCart(product, quantity = 1) {
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();

    if (currentUser == null) {
      alert("User not logged in. Please log in to use the shopping cart.");
      return;
    }

    const userId = currentUser.id;
    const cart = new Cart(userId);

    cart.addItem(product, quantity);
  }

  static removeItemFromCart(productId) {
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();

    if (currentUser == null) {
      alert("User not logged in. Please log in to use the shopping cart.");
      return;
    }

    const userId = currentUser.id;
    const cart = new Cart(userId);

    cart.removeItem(productId);
  }

  static getCartItems() {
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();

    if (currentUser == null) {
      alert("User not logged in. Please log in to use the shopping cart.");
      return [];
    }

    const userId = currentUser.id;
    const cart = new Cart(userId);

    return cart.getItems();
  }

  static getCartTotal() {
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();

    if (currentUser == null) {
      alert("User not logged in. Please log in to use the shopping cart.");
      return 0;
    }

    const userId = currentUser.id;
    const cart = new Cart(userId);

    return cart.getTotal();
  }

  static checkoutCart(paymentMethod) {
    const userUtility = new UserUtility();
    const currentUser = userUtility.getCurrentUser();

    if (currentUser == null) {
      alert("User not logged in. Please log in to use the shopping cart.");
      return;
    }

    const userId = currentUser.id;
    const cart = new Cart(userId);

    cart.checkout(paymentMethod);
  }
}

export default CartUtility;
