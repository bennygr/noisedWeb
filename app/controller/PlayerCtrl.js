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
						'Name': 'Noised.Commands.Core.Play',
						'Parameters': ["file:///home/bgr/Musik/test.mp3"]
					};  
			Command.sendCommand(connection,command);
		}
		
	};
});
