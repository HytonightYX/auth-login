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

const pool = mysql.createPool(conf);

async function findUser() {
  const result = await pool.query('SELECT * FROM user');
  if (result[0].length < 1) {
    throw new Error('用户未找到');
  }
  return result[0][0];
}

const userLogin = async (username, password) => {
  const user = await findUser();
  if (user.password === password) {
    return user;
  }
  throw new Error('密码错误');
};

module.exports = {
  userLogin,
};
