// hash-worker.js
const bcrypt = require('bcryptjs');

// Export the hashPassword function
module.exports = {
  hashPassword(password) {
    // Hash the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
    // Return the hashed password

  }
};

