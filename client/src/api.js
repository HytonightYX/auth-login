// const base = 'http://localhost:8000';
const dev = process.env.NODE_ENV === 'development'
const base = dev ? '//dev.yunxi.site:8000' : '//101.37.14.191';
const REGISTER = base + '/register';
const LOGIN = base + '/login';

const SMSCODE = base + '/smscode';

const RANDOM = 'https://crypto.hznuhub.net/dev-api/random/true/6';

export default {
  LOGIN,
  REGISTER,
  SMSCODE,
  RANDOM
};