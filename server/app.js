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
app.use(express.static(__dirname + '/'));

/**
 * 调用 DB procedure
 */
function procedure(sql, params, res, cb) {
  db.procedureSQL(sql, JSON.stringify(params), (err, ret) => {
    if (err) {
      res.status(500).json({ code: -1, msg: '提交请求失败，请联系管理员！', data: null });
    } else {
      cb(ret);
    }
  });
}

app.get('*.js', function (req, res, next) {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

/**
 * 测试接口
 */
app.get('/test', async function (req, res) {
  res.status(200).json({ code: 200, data: {}, msg: '接口测试成功' });
});

/**
 * 登录
*/
app.post('/login', async function (req, res) {
  const sql = `CALL PROC_USER_LOGIN(?)`;
  const params = req.body;
  console.log(params);
  procedure(sql, params, res, (r) => {
    res.status(200).json({ code: 200, data: r[0], msg: '获取到用户信息' });
  });
});

app.listen(port, () => console.log(`> Running on localhost:${port}`));