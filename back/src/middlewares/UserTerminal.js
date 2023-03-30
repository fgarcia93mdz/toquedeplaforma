const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../database/userPlayer.json');
const usersDB = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const User = {

  getData: function () {
    return usersDB;
  },

  findAll: function () {
    return this.getData();
  },

  findByField: function (field, text) {
    let allUsers = this.findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
  },
  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
    fs.writeFileSync(this.usersDB, JSON.stringify(finalUsers, null, ' '));
    return true;
  }
}


module.exports = User;