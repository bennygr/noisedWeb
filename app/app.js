
var noisedWeb = angular.module('noisedWeb',['ngRoute']);

noisedWeb.config(function($routeProvider){
	$routeProvider

	//define full background image for route
	// hasBackgroundImage: Whether a background image 
    //					   should be displayed or not
	// forcedBackgroundImage: define a background image
	// fallbackBackgroundImage: display current artist image or
	//						    fallback image						

	//login
	.when('/',{
			templateUrl: 'app/views/login.html',
			controller:  'LoginCtrl',
			hasBackgroundImage: true,
			forcedBackgroundImage: 'app/img/login.jpg'
	})
	//player
	.when('/player',{
			templateUrl: 'app/views/player.html',
			controller:  'PlayerCtrl',
			hasBackgroundImage: true,
			fallbackBackgroundImage: 'app/img/default.jpg'
	});
});

