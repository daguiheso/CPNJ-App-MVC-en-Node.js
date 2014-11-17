var Article = function(conf){
	this.conf = conf || {};
	this.response = function(){
		this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
	}
}

// funcionalidad
    // get_add
    // get_list
    // get_edit_data
Article.prototype.get_add = function(req, res, next){
	res.render('article_save', {nombre: 'add'});
}

Article.prototype.get_list = function(req, res, next){
	res.render('article_save', {nombre: 'list'});
}

Article.prototype.get_edit_data = function(req, res, next){
	res.render('article_save', {nombre: 'edit'});
}

module.exports = Article;