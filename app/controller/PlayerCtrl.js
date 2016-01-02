noisedWeb.controller('PlayerCtrl', function($scope,BackgroundImage,ConnectionManager,Command){
	$scope.albumImage = "app/img/insomiac.jpg";
	$scope.status = {
		isopen: false
	};

	$scope.HelloWorld = function(){
		BackgroundImage.setCurrentImage("app/img/greenDay.jpg");
	}

	$scope.test = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Play',
						'Parameters': ["file:///home/bgr/Musik/AFI/I Heard a Voice/AFI - 06 - The Days Of The Phoenix (Live Arena Long Beach CA).mp3"]
					};  
			Command.sendCommand(connection,command);
		}
		
	};
});
