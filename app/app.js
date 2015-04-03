
var noisedWeb = angular.module('noisedWeb',['ngRoute']);

noisedWeb.config(function($routeProvider){
	$routeProvider
	//login
	.when('/',{
			templateUrl: 'app/views/login.html',
			controller:  'LoginCtrl'
	})
	//player
	.when('/player',{
			templateUrl: 'app/views/player.html',
			controller:  'PlayerCtrl'
	});
});

