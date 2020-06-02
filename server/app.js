const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('./db');

const app = express();
const port = 8000;

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
  const data = await db.userLogin();
  console.log(data);
  res.status(200).json(data);
});

app.listen(port, () => console.log(`> Running on localhost:${port}`));
