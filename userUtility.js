import User from './userModel.js';

class UserUtility {
  constructor() {
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
    this.updateSession();
  }

  findUserByEmail(email) {
   // return this.users.find(user => user.getEmail() === email);\
    return this.users.find(user => user.email === email);

  }

  findUserByName (name) {

    //print (this.users);

    console.log(this.users);

    return this.users.find(user => user.id === name);
  }

  validatePassword(user, inputPassword) {
    //validate password from user object 
    
    if(user&& user.password === inputPassword){
      return true;
    }

    return false;

  }

  updateSession() {
    window.sessionStorage.setItem('users', JSON.stringify(this.users));
  }

  loadUsersFromSession() {
    const storedUsers = window.sessionStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }
}

export default UserUtility;
