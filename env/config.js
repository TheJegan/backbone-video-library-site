var twitterStrategy = {
	consumerKey: process.env.TwitterKey,
	consumerSecret: process.env.TwitterSecret,
	callbackURL: process.env.TwitterCallback
};

var googleStrategy = {
	clientID: process.env.GoogleKey,
	clientSecret: process.env.GoogleSecret,
	callbackURL: process.env.GoogleCallback
};
  
 var facebookStrategy = {
 	clientID: process.env.FacebookKey,
	clientSecret: process.env.FacebookSecret,
	callbackURL: process.env.FacebookCallback
 };

var config = {
	twitter: twitterStrategy,
	google: googleStrategy,
	facebook: facebookStrategy,
	mongooseURL: process.env.MongooseURL,
	isAuthenticated: function(req, res, next)
	{
		 if (req.isAuthenticated()) { 
		 	return next(); 
		 }
		console.log('is not isAuthenticated');
		res.status(401).send({'message': 'you are not authorized'});
	},
	isAuthorized: function(req, res, next){
		if(req.user.role === "admin"){
			return next();
		}

		res.status(401).send({'message': 'you are not authorized'});
	},
	isApproved: function(req, res, next){
		console.log(req.user);
		if(req.user.isApproved || req.user.role ==='admin'){
			return next();
		}

		console.log('is not isApproved');
		res.status(401).send({'message': 'you are not authorized'});
	}	
};
module.exports = config;