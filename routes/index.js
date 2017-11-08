module.exports = function Route(app, server){
	var io = require('socket.io').listen(server) 
	// root route to render the index.ejs view
	app.get('/', function(req, res) {
	 res.render("index");
	});
	// post route for adding a data from a survey
	// app.post('/result', function(req, res) {
	// 	const submittedInfo = {
	// 		name: req.body.name,
	// 		dojoLocation: req.body.dojo,
	// 		favoriteLanguage: req.body.language,
	// 		comment: req.body.comment
    // };
	//  	res.render("result", { userData: submittedInfo });
	// });
	//listen to connection even from the client side
	io.sockets.on('connection', function (socket){
		//server listens to "posting_form" event
			socket.on("posting_form", function (data){
				//generate a random number
				var random_number = Math.floor((Math.random() * 1000) + 1);
			//will emit the data to the client
			socket.emit('updated_message', {response: data}); 
			socket.emit('random_number', {response: random_number}); 
		})
	})
};