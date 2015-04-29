noisedWeb.controller('SettingsCtrl', function($scope,$modal,Theme,ConnectionSettingsStorage){
	$scope.themes = Theme.getThemes();
	$scope.currentTheme = Theme.getCurrentTheme();
	$scope.connectionSettings = ConnectionSettingsStorage.getAllSettings();

	$scope.createConnectionSettings = function(templateUrl){
		var modalInstance = $modal.open({
				templateUrl: templateUrl,
				controller: 'NewConnectionSettingsCtrl',
		})
	};

	$scope.removeConnectionSettings = function(connectionSettings){
		//remove the settings object
		ConnectionSettingsStorage.removeSetings(connectionSettings);
		//reload settings
		$scope.connectionSettings = ConnectionSettingsStorage.getAllSettings();
	}

	$scope.setTheme = function(theme){
		$scope.currentTheme = theme;
		Theme.setCurrentTheme(theme);
	};
});
