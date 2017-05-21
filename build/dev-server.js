var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var http = require('http');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var data = require('../music-data.json');
// var musicData = data.musicData;

var apiRoutes = express.Router();

apiRoutes.get('/music-data', function (req, res) {
  res.json({
    errno: 0,
    musicData: data.musicData
  });
});

 
apiRoutes.get('/search/:num/:song',function(req, res){
   let num = req.params.num;
   let song = req.params.song;

   function search(num,song){
     return new Promise((resolve, reject)=>{
         let responsedata="";
         http.get( encodeURI("http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n="+num+"&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w="+song), function(res) {
            res.on('data',function(data){
              responsedata+=data;
            }) ;
            res.on('end',function(data){
              resolve(responsedata);
         });
       }).on('error', (e) => {
           reject(e);
    });
   })
 }

   search(num, song).then(responsedata=>{
     res.json(JSON.parse(responsedata));
   });

});

apiRoutes.get('/hot', (req, res) => {
  let hotKeywords = ['范玮琪', '张杰', '赵雷', '张震岳', '林志炫', '咖喱咖喱', '陈奕迅', '周笔畅', '张靓颖', 'Here With you', '周杰伦', '王力宏', '我想和你唱', '薛之谦'];
  let rHot = new Array(6);
  for (let i = 0; i < rHot.length; i++) {
    let length = hotKeywords.length;
    let random = Math.floor(length * Math.random());
    rHot[i] = hotKeywords[random];
    hotKeywords.splice(random, 1);
  }
  res.json(rHot);

});

app.use('/api', apiRoutes);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
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
  app.use(proxyMiddleware(options.filter || context, options))
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

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
