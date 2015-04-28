
noisedWeb.controller('NewConnectionSettingsCtrl', 
					 function($scope,
							  $modalInstance,
							  ConnectionManager,
							  ConnectionSettingsStorage,
							  Command){
	
	$scope.errorMessage = null;
	$scope.host = null;
	$scope.description = null;
	$scope.username = null;
	$scope.password = null;
	var connectionIdentifier = new Date().getTime();

	var errorCallback = function(connection, response){
		if(connection.connectionIdentifier === connectionIdentifier){
			$scope.errorMessage = response.Parameters[0];
			$scope.$digest();
		}
	};

	var welcomeCallback = function(connection, response){
		if(connectionIdentifier == connection.connectionIdentifier){
			//We received a weclome message, this means we are 
			//connected and we are going to store the connection settings
			Command.unregisterResponseCallback(welcomeCallback);

			var existingSettings = ConnectionSettingsStorage.getSettingsForHost($scope.host);
			if(existingSettings){
				$scope.errorMessage = "Connection to this host already exists";
			}
			else{
				var connectionSettings = 
					new ConnectionSettings($scope.host,
						$scope.description,
						$scope.username,
						$scope.password);
				ConnectionSettingsStorage.addSettings(connectionSettings);
				//var test  = JSON.stringify(connectionSettings);
			}


			$scope.$digest();
		}
	};

	//Error handling on noised level
	Command.registerResponseCallback(errorCallback,/Noised\.Core\.Commands\.Error/);
	Command.registerResponseCallback(welcomeCallback,/Noised\.Commands\.Core\.Welcome/);

	$scope.cancel = function(){
		$modalInstance.dismiss('cancel');
	};
	$scope.connect = function(){
		if(!$scope.host){
			$scope.errorMessage = "Please enter a valid host";
		}
		else if(!$scope.description){
			$scope.errorMessage = "Please enter a description";
		}
		else if(!$scope.username){
			$scope.errorMessage = "Please enter a username";
		}
		else if(!$scope.password){
			$scope.errorMessage = "Please enter a password";
		}
		else{
			$scope.errorMessage = null;
			ConnectionManager.connectToServer(connectionIdentifier,
											  $scope.host,
											  $scope.description,
											  $scope.username,
											  $scope.password,
											  function(connection,error){
													$scope.errorMessage = 
														"Error connection to server";
													$scope.$digest();
											  },
											  function(closeConnection,code){
													$scope.errorMessage = 
														"Server closed connection";
													$scope.$digest();
			});
											  
		}
	};
});
