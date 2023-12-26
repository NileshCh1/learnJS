// productUtility.js
import { Product, Payment } from './models.js';


class ProductUtility {
  constructor() {
    this.products = this.loadProductsFromSession();
  }

  addProduct(product) {
    // Check if the product with the same id already exists
    const existingProduct = this.products.find(p => p.id === product.id);

    if (existingProduct) {
      // Product with the same id already exists, notify the user
      console.warn('Product with the same id already exists. Duplicate not added.');
    } else {
      // Product is not a duplicate, add it to the list
      this.products.push(product);
      this.updateSession();
      console.log('Product added successfully.');
    }
  }

  removeProduct(productId) {
    this.products = this.products.filter(product => product.id !== productId);
    this.updateSession();
  }

  getProducts() {
    return this.products;
  }

  updateSession() {
    window.sessionStorage.setItem('products', JSON.stringify(this.products));
  }

  loadProductsFromSession() {
    const storedProducts = window.sessionStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
}

export default ProductUtility;
