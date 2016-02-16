var logger  = require('./helpers/logger.js')
  , express = require('express')
  , app     = express()
  , bodyParser = require('body-parser')
  , user    = require('./models/users.js')
  , cfg     = require('./config.js')
  , http    = require('http')
  , errorhandler = require('./middlewares/errorhandler.js')
  , customMw = require('./middlewares/middleware.js')
  , port    = process.env.PORT || 3000

var opt = {  
  server:{
       socketOptions: { keepAlive: 1}
  }
};

app.set('secret', cfg.secret)
app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use(require('./controllers'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});
app.get('*', errorhandler.handler_404);

app.use(errorhandler.logerror);
app.use(errorhandler.handler_500);
app.use(errorhandler.render_404);
app.use(errorhandler.render_500);

logger.debug("Start service...");
httpServer = http.createServer(app);
httpServer.listen(port, function(){
	logger.info("worker " + process.pid + " is ready (:" + port + ")")
});
