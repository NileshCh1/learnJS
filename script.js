// script.js

import User from "./userModel.js";
import UserUtility from "./userUtility.js";
import ProductUtility from "./productUtility.js";
import { Product, Payment } from "./models.js";

const userUtility = new UserUtility();
userUtility.loadUsersFromSession();

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const user = userUtility.findUserByName(username);

  if (user && userUtility.validatePassword(user, password)) {
    //alert("Login successful");
    userUtility.setCurrentUser(user);
    addProducts();
    window.location.href = "product.html";
  } else {
    alert("Invalid username or password");
  }
}

function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const username = document.getElementById("signupUsername").value;

  // Check if the email is already taken
  if (userUtility.findUserByEmail(email)) {
    alert("Email already taken. Please choose another.");
    return;
  }

  const newUser = new User(username, email, password);
  userUtility.addUser(newUser);

  alert("Signup successful");

  // Switch to the login form after successful signup
  showLoginForm();
  addProducts();
}

function showSignupForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
}

function showLoginForm() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
}

function addProducts() {
  // Create an instance of ProductUtility
  const productUtility = new ProductUtility();
// Dummy products
const laptop = new Product(
    1,
    "Laptop",
    999.99,
    "https://via.placeholder.com/150/3498db/ffffff?text=Laptop"
  );
  const smartphone = new Product(
    2,
    "Smartphone",
    499.99,
    "https://via.placeholder.com/150/2ecc71/ffffff?text=Smartphone"
  );
  const headphones = new Product(
    3,
    "Headphones",
    79.99,
    "https://via.placeholder.com/150/e74c3c/ffffff?text=Headphones"
  );
  const tablet = new Product(
    4,
    "Tablet",
    299.99,
    "https://via.placeholder.com/150/f39c12/ffffff?text=Tablet"
  );
  const camera = new Product(
    5,
    "Camera",
    599.99,
    "https://via.placeholder.com/150/9b59b6/ffffff?text=Camera"
  );
  
  // Add dummy products to the list
  productUtility.addProduct(laptop);
  productUtility.addProduct(smartphone);
  productUtility.addProduct(headphones);
  productUtility.addProduct(tablet);
  productUtility.addProduct(camera);

  // Display the current list of products
  console.log("Current List of Products:", productUtility.getProducts());
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Attach event listeners to buttons
  document.getElementById("loginButton").addEventListener("click", login);
  document.getElementById("signupButton").addEventListener("click", signup);

  // Attach event listener to "Signup here" link
  document
    .getElementById("signupLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      showSignupForm();
    });

  // Attach event listener to "Login here" link
  document
    .getElementById("loginLink")
    .addEventListener("click", function (event) {
      event.preventDefault();
      showLoginForm();
    });
});
