var env = process.env.NODE_ENV || 'production',
    express = require('express'),
	swig = require('swig'),
	middlewares = require('./middlewares/admin');
var ExpressServer = function(config){
	config = config || {}; 

	this.expressServer = express();

	// middlewares

	for(var i in middlewares){
		this.expressServer.use(middlewares[i]);
	}

	this.expressServer.engine('html', swig.renderFile);
	this.expressServer.set('view engine', 'html');
	this.expressServer.set('views', __dirname + '/website/views/templates');
	swig.setDefaults({varControls:['[[',']]']});


	if(env == 'development'){
		console.log('OK NO HAY CACHE');
		//borrando cache de swig y expressServer
		this.expressServer.set('view cache', false);
		swig.setDefaults({cache: false,  varControls:['[[',']]']})
	}

	this.expressServer.get('/article/save/', function(req,res,next){
		res.render('article_save',{nombre:'diego'});
	    //res.send('Hello from article save');
	});

	this.expressServer.get('/article/remove/', function(req,res,next){
	    res.send('Hello from article remove');
	});

	this.expressServer.get('/article/add/', function(req,res,next){
	    res.send('Hello from article add');
	});

	this.expressServer.get('/article/see/:data', function(req,res,next){
	    res.send('Hello from article see');
	});

	this.expressServer.get('/article/edit/:data', function(req,res,next){
	    res.send('Hello from article edit');
	});

	this.expressServer.get('/article/list/', function(req,res,next){
	    res.render('article_list',{});
	});
};

module.exports = ExpressServer;