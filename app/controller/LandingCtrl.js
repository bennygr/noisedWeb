noisedWeb.controller('LandingCtrl', function($scope,
											 ConnectionSettingsStorage,
											 ConnectionManager,
											 Command){

	$scope.connectionsAvailable = 
		ConnectionSettingsStorage.getAllSettings().length > 0;
});
