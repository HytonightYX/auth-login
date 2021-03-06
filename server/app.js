const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('./db');

const app = express();
const port = 8000;

const LOGIN_TYPE = {
  PWD: 1,
  SMS: 2,
  USB: 3,
  REG: -1,
};

app.use(compression());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(`${__dirname}/`));

app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

/**
 * 测试接口
 */
app.get('/test', async (req, res) => {
  res.status(200).json({ code: 200, data: {}, msg: '接口测试成功' });
});

/**
 * 登录
*/
app.post('/login', async (req, res) => {
  try {
    const { type } = req.body;
    if (type === LOGIN_TYPE.PWD) {
      const { username, password } = req.body;
      const result = await db.passwordLogin(username, password);
      res.status(200).json({ code: 200, data: result, msg: '登录成功' });
    }

    if (type === LOGIN_TYPE.SMS) {
      const { phone, code } = req.body;
      const result = await db.smsCodeLogin(phone, code);
      res.status(200).json({ code: 200, data: result, msg: '登录成功' });
    }
  } catch (e) {
    res.status(200).json({ code: 500, data: {}, msg: e.toString() });
  }
});

/**
 * 获取验证码接口
 */
app.get('/smscode', async (req, res) => {
  try {
    const { phone } = req.query;
    console.log(phone);
    const result = await db.sendSmsCode(phone);
    res.status(200).json({ code: 200, data: result, msg: '发送成功，5分钟内有效～' });
  } catch (e) {
    res.status(200).json({ code: 500, data: {}, msg: e.toString() });
  }
});

/**
 * 注册
 */
app.post('/register', async (req, res) => {
  try {
    const data = await db.userRegister(req.body);
    console.log(data);
    res.status(200).json({ code: 200, data, msg: '注册成功' });
  } catch (e) {
    res.status(200).json({ code: 500, data: e, msg: '注册失败请重试' });
  }
});

app.listen(port, () => console.log(`> Running on localhost:${port}`));
