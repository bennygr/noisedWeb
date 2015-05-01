noisedWeb.controller('LandingCtrl', function($scope,
											 ConnectionSettingsStorage,
											 ConnectionManager,
											 Command){

	$scope.connectionsAvailable = 
		ConnectionSettingsStorage.getAllSettings().length > 0;


	$scope.test = function(){
		
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Commands.Core.Play',
						'Parameters': ["file:///home/bgr/Musik/test.mp3"]
					};  
			Command.sendCommand(connection,command);
		}
		
	};
});
