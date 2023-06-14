const bcrypt = require("bcryptjs");

// to encrypt password
function encrypt(text) {
  try {
    return bcrypt.hashSync(text, 10);
  } catch (e) {
    console.log(e);
  }
}

function compareHash(text, hash) {
  //comparehash it compare and match your enter password and encrypt password to login in the application
  try {
    return bcrypt.compareSync(text, hash);
  } catch (e) {
    console.log(e);
  }
  return false;
}

module.exports = { encrypt, compareHash };
