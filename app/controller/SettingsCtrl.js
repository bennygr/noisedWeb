noisedWeb.controller('SettingsCtrl', function($scope,
											  $modal,
											  Theme,
											  ConnectionManager, 
											  ConnectionSettingsStorage){

	$scope.themes = Theme.getThemes();
	$scope.currentTheme = Theme.getCurrentTheme();

	var reloadConnections = function(){
		//reload settings
		$scope.connectionSettings = ConnectionSettingsStorage.getAllSettings();
		$scope.connectionsAvailable = ConnectionSettingsStorage.getAllSettings().length > 0;
	};
	//reload the connections
	reloadConnections();

	/*
	 * Creates a new connection
	 */
	$scope.createConnectionSettings = function(templateUrl){
		var modalInstance = $modal.open({
				templateUrl: templateUrl,
				controller: 'CreateConnectionSettingsCtrl',
				resolve: {
					items: function () {
						return null;
					}
				}
		});

		modalInstance.result.then(function(){
			//reload  settings
			reloadConnections();
		});
	};

	/*
	 * Edits an existing connection
	 */
	$scope.editConnectionSettings = function(templateUrl,connectionSettings){
		var modalInstance = $modal.open({
				templateUrl: templateUrl,
				controller: 'CreateConnectionSettingsCtrl',
				resolve: {
					items: function () {
						return connectionSettings;
					}
				}
		});

		modalInstance.result.then(function(){
			//reload settings
			reloadConnections();
		});
	}

	/*
	 * removes a given connetion settings
	 */
	$scope.removeConnectionSettings = function(connectionSettings){
		//Check if we have an active connection and disconnect
		var con = ConnectionManager.getConnectionByHost(connectionSettings.host);
		if(con){
			ConnectionManager.disconnectFromServer(con);
		}

		//remove the settings object
		ConnectionSettingsStorage.removeSetings(connectionSettings);
		//reload settings
		reloadConnections();
	}

	/*
	 * changs the UI theme
	 */
	$scope.setTheme = function(theme){
		$scope.currentTheme = theme;
		Theme.setCurrentTheme(theme);
	};
});
