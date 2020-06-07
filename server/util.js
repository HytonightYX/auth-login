const crypto = require('crypto');

function generateAuth(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  // const hashDigest = SHA256('hsy');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha256').toString('hex');
  return { salt, hash };
}

function validatePassword(dbuser, p) {
  const hash = crypto.pbkdf2Sync(p, dbuser.salt, 1000, 64, 'sha256').toString('hex');
  return dbuser.hash === hash;
}

module.exports = {
  generateAuth,
  validatePassword,
};
