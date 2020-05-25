const conf = {
  host: '101.37.14.191',
  port: 3306,
  database: 'library',
  user: 'libadmin',
  password: require('./secret').mysql_pwd,
  multipleStatements: true,
  secret: 'lorem',
};

module.exports = conf;