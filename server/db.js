const conf = {
  host: '101.37.14.191',
  database: 'gqldemo',
  user: 'gqldemouser',
  password: 'gqldemopwd',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const mysql = require('mysql2/promise');
const NodeCache = require('node-cache');
const axios = require('axios');
const { sendSMS, generateAuth, validatePassword } = require('./util');

const nodeCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

const pool = mysql.createPool(conf);

const passwordLogin = async (username, password) => {
  const query = await pool.query('SELECT * FROM user WHERE username = ? LIMIT 1', [username]);
  if (query[0][0]) {
    const dbuser = query[0][0];
    if (validatePassword(dbuser, password)) {
      return { username };
    }
  }
  throw new Error('用户名或密码错误');
};

const smsCodeLogin = async (phone, code) => {

};

const sendSmsCode = async (phone) => {
  const res = await axios.get('https://crypto.hznuhub.net/dev-api/random/true/2');
  let code = 'D2F1C41441C9';
  if (res && res.status === 200 && res.data.code === 100) {
    code = res.data.data;
  }
  console.log(code);
  const result = await sendSMS(phone, code);
  return result;
};

/**
 * 用户注册
 * @param {Object} params 注册参数
 */
const userRegister = async (params) => {
  const { salt, hash } = generateAuth(params.password);
  console.log(salt, hash);
  const userParams = {
    username: params.username,
    phone: params.phone,
    hash,
    salt,
  };

  const result = await pool.query('INSERT INTO user SET ?', userParams);

  return result;
};

module.exports = {
  passwordLogin,
  userRegister,
  smsCodeLogin,
  sendSmsCode,
};
