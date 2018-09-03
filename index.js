/**
 * 网站入口， express 服务
 */


const opn = require('opn');
const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const rewrite = require('express-urlrewrite');
const proxy = require('http-proxy-middleware');

const resolve = file => path.resolve(__dirname, file)
const isProd = process.env.NODE_ENV !== 'development'
const buildProdConfig = require("./buildProdConfig.json");
const vueServer = require("./server/vueServer.js");

const app = express();

//启用压缩
app.use(compression({
  threshold: 0
}))

app.use(favicon('./server/favicon.png'));

if (buildProdConfig.webBasePath) {
  app.use(rewrite(new RegExp("^" + buildProdConfig.webBasePath + "\/(.*)"), '/$1'));
}


app.use(function (req, res, next) {
  // log.info("visit "+req.url);
  next();
});

const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})
app.get("*", function (err, req, res, next) {
  //  log.err(err);
  next();
})
app.use('/dist', serve('./dist', true))
//app.use('/manifest.json', serve('./manifest.json', true))
app.use('/service-worker.js', serve('./dist/service-worker.js'))

//如果api服务器和web服务器不在同一域名下，在这里配置
var apiPath = buildProdConfig.apiUrl; // 'http://192.168.10.153:18083';

var proxyOption = {
  target: apiPath,
  pathRewrite: {},
  changeOrigin: true
}
proxyOption.pathRewrite['^' + buildProdConfig.webBasePath + '/api/'] = '/'
app.use('/api', proxy(proxyOption));
var apiPath = buildProdConfig.apiLoginUrl; //'http://36.152.34.20:8890';
var loginProxyOption = {
  target: apiPath,
  pathRewrite: {},
  changeOrigin: true
}
loginProxyOption.pathRewrite['^' + buildProdConfig.webBasePath + '/loginApi/'] = '/'


app.use('/loginApi', proxy(loginProxyOption));



app.use(vueServer);
app.use(function (err, req, res, next) {
  //  log.err(err);
});

const port = buildProdConfig.port;


var uri = 'http://localhost:' + port

app.listen(port, () => {
  //log.info(`server started at localhost:${port}`)
})
if (!isProd) {
  opn(uri)
}