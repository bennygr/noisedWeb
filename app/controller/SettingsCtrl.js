noisedWeb.controller('SettingsCtrl', function($scope,Theme){
	$scope.Test = "Hello Benny"

	$scope.themes = Theme.getThemes();

	$scope.currentTheme = Theme.getCurrentTheme();

	$scope.setTheme = function(theme){
		$scope.currentTheme = theme;
		Theme.setCurrentTheme(theme);
	};

	$scope.connectionSettings = [{name: "Living room",
								  host: "192.168.1.12", 
								  connected: false, 
								  user: "benny"},

							      {name: "Kitchen",
								  host: "192.168.1.122",
								  user: "benny",
								  connected: true,}, 
								  ];
});
