const crypto = require('crypto');

function generateAuth(password) {
  console.log(password);
  const salt = crypto.randomBytes(32).toString('hex');
  // const hashDigest = SHA256('hsy');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return { salt, hash };
}

function validatePassword(dbuser, p) {
  const hash = crypto.pbkdf2Sync(p, dbuser.salt, 1000, 64, 'sha256').toString('hex');
  console.log('=======');
  console.log(p);
  console.log(dbuser);
  console.log('hash2', hash);
  return dbuser.hash === hash;
}

module.exports = {
  generateAuth,
  validatePassword,
};
