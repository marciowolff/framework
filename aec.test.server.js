
var express = require('express'),
	http = require('http'),
 	path = require('path'), 
 	reload = require('reload');

var app = express();
var appDirectory = path.join(__dirname, 'aec');

app.configure(function() {
  app.set('port', process.env.PORT || 4000);
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(express.static(appDirectory));
});


app.get('/', function(req, res){
	res.sendfile(path.join(appDirectory, '/tests/index.html'));
});

var server = http.createServer(app);
reload(server, app);
server.listen(app.get('port'), function(){
	console.log('Servidor Express iniciado na porta %s', app.get('port'));
});