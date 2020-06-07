const crypto = require('crypto');

const pwd = 'bb';

const dbuser = {
  id: 35,
  username: 'aa',
  phone: '123',
  salt: 'd63da5e34b738bc7cf8987d8273ace77fb71af59269dc411c57fa52825bec210',
  hash: '24c8d88fa1b6586c212a33c03208fe63c183236f76e360b2129a05e474222876d814890803ec250cea3838417dbd3a00f1416ebc6af58762f5a0246da18785f7',
};

// const hashDigest = SHA256('hsy');
const hash = crypto.pbkdf2Sync(pwd, dbuser.salt, 1000, 64, 'sha256').toString('hex');
console.log(dbuser.hash, '\n', hash);

/**
 * bb =>
 * salt = 98948a2334775c62a5909375a25d93f747252d1a5f115b1af87a9faf9364740c
 * hash = 8495aa879a56b391e3c25895395b9f609b4264cf181bc409f4bc40e9e118ed1b8bfb6f8d6c3cf28588520c8076e6b076e5615b6502dff81b6a95afb4a3100b4b
 *
 *
 *
 */
