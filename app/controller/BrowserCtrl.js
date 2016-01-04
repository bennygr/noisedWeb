noisedWeb.controller('BrowserCtrl', function($scope,
											 ConnectionSettingsStorage,
											 ConnectionManager,
											 Command){
	$scope.searchInput = null;
	$scope.searchValue = null;
	$scope.searchResult = null;

	$scope.search = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Search',
						'Parameters': [$scope.searchInput]
					};  
			Command.sendCommand(connection,command);
		}
	}
	
	var searchResultHandler = function(connection, response){
		var resultList = response.Parameters[0][0].MediaItems;
		$scope.searchResult = resultList;
		$scope.searchValue = $scope.searchInput;
		$scope.$digest();
	}

	Command.registerResponseCallback(searchResultHandler,/Noised.\Commands\.Core\.Search/);
});
