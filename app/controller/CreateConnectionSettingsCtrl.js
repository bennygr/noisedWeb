
noisedWeb.controller('CreateConnectionSettingsCtrl', 
					 function($scope,
							  $uibModalInstance,
							  ConnectionManager,
							  ConnectionSettingsStorage,
							  Command,
							  items){
	
	$scope.title = "New connection";
	$scope.errorMessage = null;
	$scope.host = null;
	$scope.description = null;
	$scope.username = null;
	$scope.password = null;
	if(items){
		$scope.title = "Edit connection";
		$scope.host = items.host;
		$scope.description = items.description;
		$scope.username = items.username;
		$scope.password = items.password;
	}
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

			//Save new settings
			var connectionSettings = 
				new ConnectionSettings($scope.host,
					$scope.description,
					$scope.username,
					$scope.password);
			ConnectionSettingsStorage.addSettings(connectionSettings);
			$scope.$digest();
			$uibModalInstance.close();
		}
	};

	//Error handling on noised level
	Command.registerResponseCallback(errorCallback,/Noised\.Core\.Commands\.Error/);
	Command.registerResponseCallback(welcomeCallback,/Noised\.Commands\.Core\.Welcome/);

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
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
			
			//deleting existing settings if existing
			var existingSettings = ConnectionSettingsStorage.getSettingsForHost($scope.host);
			if(existingSettings){
				
				//Check if we have an active connection and disconnect
				var con = ConnectionManager.getConnectionByHost(existingSettings.host);
				if(con){
					ConnectionManager.disconnectFromServer(con);
				}

				//Remove existing settings object
				ConnectionSettingsStorage.removeSettings(existingSettings);
			}

			//Establish a new connection
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
