class User {
  constructor(id, password, email) {
    this.id = id;
    this.password = password;
    this.email = email;
  }

  getId() {
    return this.id;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  validatePassword(inputPassword) {
    return this.password === inputPassword;
  }
}

export default User;
