noisedWeb.controller('SettingsCtrl', function($scope,$modal,Theme,ConnectionSettings){
	$scope.themes = Theme.getThemes();
	$scope.currentTheme = Theme.getCurrentTheme();
	$scope.connectionSettings = ConnectionSettings.getSettings();
	ConnectionSettings.clearSettings();

	$scope.createConnectionSettings = function(templateUrl){
		var modalInstance = $modal.open({
				templateUrl: templateUrl,
				controller: 'NewConnectionSettingsCtrl',
		})
	};

	$scope.setTheme = function(theme){
		$scope.currentTheme = theme;
		Theme.setCurrentTheme(theme);
	};
});
