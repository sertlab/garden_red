/*
	This is our beloved router
	Does all the routing as you would expect
*/
module.exports = function(app) {


	//Documentation page
	app.get('/documentation',function(req,res){

		res.sendfile('./doc/doc.html')

	})

	//home is the login-signup page
	app.get('/home',function(req,res){

		res.render('login_signup.jade')

	})


	//send to edit user
	app.get('/profile',function(req,res){
		
		res.render('menu_tmplt.jade');	
		
	})

	//send to edit user
	app.get('/info',function(req,res){
		
		res.render('info.jade');	
		
	})

	app.get('/edit',function(req,res){
		
		res.render('edit.jade');	
		
	})

	app.get('/devices',function(req,res){
		
		res.render('devices.jade');	
		
	})

	app.get('/contact',function(req,res){
		
		res.render('contact.jade');	
		
	})

	//redirect unknown requests to tmplt with dependencies
	app.get('*',function(req,res){
		res.render('basic_tmplt.jade')
	})



}