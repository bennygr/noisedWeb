
var noisedWeb = angular.module('noisedWeb',['ngRoute','ui.bootstrap']);

noisedWeb.config(function($routeProvider){
	$routeProvider

	//define full background image for route
	// hasBackgroundImage: Whether a background image 
    //					   should be displayed or not
	// forcedBackgroundImage: define a background image
	// fallbackBackgroundImage: display current artist image or
	//						    fallback image						
	//Using default error message view
	//login
	.when('/',{
			templateUrl: 'app/views/landing.html',
			controller:  'LandingCtrl',
			hasBackgroundImage: true,
			forcedBackgroundImage: 'app/img/login.jpg'
	})
	//player
	.when('/player',{
			templateUrl: 'app/views/player.html',
			controller:  'PlayerCtrl',
			hasBackgroundImage: true,
			fallbackBackgroundImage: 'app/img/default.jpg'
	})
	//player
	.when('/discover',{
			templateUrl: 'app/views/discover.html',
			controller:  'DiscoverCtrl',
			hasBackgroundImage: true,
			fallbackBackgroundImage: 'app/img/default.jpg'
	})
	.when('/queue',{
			templateUrl: 'app/views/queue.html',
			controller:  'QueueCtrl',
			hasBackgroundImage: true,
			fallbackBackgroundImage: 'app/img/default.jpg'
	})
	.when('/playlists',{
			templateUrl: 'app/views/playlists.html',
			controller:  'PlaylistsCtrl',
			hasBackgroundImage: true,
			fallbackBackgroundImage: 'app/img/default.jpg'
	})
	.when('/settings',{
			templateUrl: 'app/views/settings.html',
			controller:  'SettingsCtrl',
			hasBackgroundImage: false
	});
});


/**
 * Executoted when the app starts
 */
noisedWeb.run(function($rootScope,
					   AppearanceSettingsStorage,
					   Theme,
					   ConnectionSettingsStorage,
					   Playback,
					   ConnectionManager){

	//Loading saved UI Theme
	var savedTheme = AppearanceSettingsStorage.getUiTheme();
	Theme.setCurrentTheme(savedTheme);
					   
	//Automatic connect all known bookmarks on startup
	(function (){
		var connectionSettings = ConnectionSettingsStorage.getAllSettings();
		for(var i=0; i<connectionSettings.length; i++){
			var settings = connectionSettings[i];
			ConnectionManager.connectToServer(new Date().getTime(),
											  settings.host,
											  settings.description,
											  settings.username,
											  settings.password,
											  null, //we don't hanle errors due on startup
											  null);//we don't hanle errors due on startup
		}
	})();
});
