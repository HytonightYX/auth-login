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

const { generateAuth, validatePassword } = require('./util');

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
};
