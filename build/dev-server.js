var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = config.dev.env
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var fetch = require('isomorphic-fetch');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const hostname = 'https://www.v2ex.com';
const api = express.Router();
api
  // .get('/topics/hot.json', (req, res) => {
  //   const path = req.originalUrl.replace('/\/api/', '');
  //   const url = hostname + path;
  //   console.log(url);
  //   fetch(url).then((data) => {
  //     return data.json();
  //   }).then((json) => {
  //     res.send(json);
  //   }).catch((e) => {
  //     console.log(e);
  //   });
  // })
  .get('/topics/:id', (req, res) => {
    console.log(req);
    const url = `${hostname}/api/topics/show.json?id=${req.params.id}`;
    console.log(url);
    fetch(url).then((data) => {
      return data.json();
    }).then((json) => {
      res.send(json);
    }).catch((e) => {
      console.log(e);
    });
  });
app.use('/api', api);

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
