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

async function findUser() {
  const result = await pool.query('SELECT * FROM user');
  if (result[0].length < 1) {
    throw new Error('用户未找到');
  }
  return result[0][0];
}

const passwordLogin = async (username, password) => {
  const dbuser = await findUser(username);
  if (validatePassword(dbuser, password)) {
    return { username };
  }
  throw new Error('密码错误');
};

/**
 * 用户注册
 * @param {Object} params 注册参数
 */
const userRegister = async (params) => {
  const { salt, hash } = generateAuth(params.password);
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
