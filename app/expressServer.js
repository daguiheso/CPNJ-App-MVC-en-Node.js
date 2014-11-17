var env = process.env.NODE_ENV || 'production',
    express = require('express'),
	swig = require('swig'),
	middlewares = require('./middlewares/admin'),
	router = require('./website/router');



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

	// this.expressServer.get('/article/save/', function(req,res,next){
	// 	res.render('article_save',{nombre:'diego'});
	//     //res.send('Hello from article save');
	// });

	// this.expressServer.get('/article/remove/', function(req,res,next){
	//     res.send('Hello from article remove');
	// });

	// this.expressServer.get('/article/add/', function(req,res,next){
	//     res.send('Hello from article add');
	// });

	// this.expressServer.get('/article/see/:data', function(req,res,next){
	//     res.send('Hello from article see');
	// });

	// this.expressServer.get('/article/edit/:data', function(req,res,next){
	//     res.send('Hello from article edit');
	// });


	for(var controller in router){
		for(var funcionalidad in router[controller].prototype){
			var method = funcionalidad.split('_')[0];
			var entorno = funcionalidad.split('_')[1];
			var data = funcionalidad.split('_')[2];
			data = (method == 'get' && data !== undefined) ? ':data' : '';
			var url = '/' + controller + '/' + entorno + '/' + data;
			this.router(controller, funcionalidad, method,url);
		}		
	}

};

//Recibe
ExpressServer.prototype.router = function(controller, funcionalidad, method, url){
	console.log(url);
	this.expressServer[method](url, function(req,res,next){
		var conf = {
			'funcionalidad' : funcionalidad,
			'req' : req,
			'res' : res,
			'next' : next
		}
		var Controller = new router[controller](conf);
		Controller.response();
	});

}

module.exports = ExpressServer;