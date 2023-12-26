// Product class representing each product in the store
export class Product {
  constructor(id, name, price, image) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.image = image;
  }
}


// Payment class to handle different payment methods
export class Payment {
  processPayment(amount) {
    // Placeholder method for processing payment
    console.log(`Processing payment of $${amount}`);
    // Additional payment processing logic can be added here
  }
}
