const crypto = require('crypto');
const ZhenzismsClient = require('./zhenzisms');

function generateAuth(password) {
  console.log(password);
  const salt = crypto.randomBytes(32).toString('hex');
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

async function sendSMS(phone, code) {
  const client = new ZhenzismsClient('sms_developer.zhenzikj.com', '106063', 'b68b9dcf-a05c-4b0d-8fb7-19baf1aaeaf9');
  const params = {};
  params.templateId = '617';
  params.number = phone;
  params.templateParams = [code, '5分钟'];
  const res = await client.send(params);
  console.log(res);
}

module.exports = {
  generateAuth,
  validatePassword,
  sendSMS,
};
