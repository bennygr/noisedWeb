noisedWeb.controller('SettingsCtrl', function($scope,$modal,Theme,ConnectionSettingsStorage){
	$scope.themes = Theme.getThemes();
	$scope.currentTheme = Theme.getCurrentTheme();
	$scope.connectionSettings = ConnectionSettingsStorage.getAllSettings();
	alert($scope.connectionSettings.length);

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
