import User from './userModel.js';

class UserUtility {
  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  addUser(user) {
    this.users.push(user);
    this.setCurrentUser(user);
    this.updateSession();
  }

  findUserByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  findUserByName(name) {
    return this.users.find(user => user.id === name);
  }

  validatePassword(user, inputPassword) {
    if (user && user.password === inputPassword) {
      return true;
    }
    return false;
  }

  getCurrentUser() {
    // if current user is null fetch it from session
    if (!this.currentUser) {
      this.loadCurrentUserFromSession();
    }
    return this.currentUser;
  }

  setCurrentUser(user) {
    this.currentUser = user;
    this.updateSession();
  }

  updateSession() {
    window.sessionStorage.setItem('users', JSON.stringify(this.users));
    window.sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
  }

  loadUsersFromSession() {
    const storedUsers = window.sessionStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.currentUser = window.sessionStorage.getItem('currentUser');
    this.loadCurrentUserFromSession();
  }

  loadCurrentUserFromSession() {
    const storedCurrentUser = window.sessionStorage.getItem('currentUser');
    this.currentUser = storedCurrentUser ? JSON.parse(storedCurrentUser) : null;
  }
}

export default UserUtility;
