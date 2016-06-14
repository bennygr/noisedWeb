
noisedWeb.controller('MainCtrl', function($scope,
		$rootScope,
		$route,
		$location,
		$uibModal,
		BackgroundImage,
		ConnectionSettingsStorage,
		ConnectionManager,
		Theme){

		$scope.theme = "";
		$scope.poster= "";
		$scope.showBallonOnError = false;
		$scope.connectionSettings = ConnectionSettingsStorage.getAllSettings();
		$scope.currentConnection = ConnectionManager.getCurrentConnection();

		/**
		 * Wathing for theme changes
		 */
		$scope.$watch(function(){ 
			return Theme.getCurrentTheme();
		}, 
		function (newTheme){
			$scope.theme = newTheme;
		}, true);

		/**
		 * Watch for Background changes
		 */
		$scope.$watch(function(){ 
			return BackgroundImage.getCurrentImage();
		}, 
		function (newImage){
			$scope.poster = newImage;
		}, true);

		/**
		 * Watch for current connection changes
		 */
		$scope.$watch(function(){ 
			return ConnectionManager.getCurrentConnection();
		}, 
		function (newImage){
			$scope.currentConnection = ConnectionManager.getCurrentConnection();
		}, true);

		/**
		 * Change the current connection based on the given connection settings
		 */
		$scope.setCurrentConnection = function (connectionSettings){
			var connection = 
				ConnectionManager.getConnectionByHost(connectionSettings.host);
			if(connection){
				ConnectionManager.setCurrentConnection(connection);
			}
			else {
				//TODO: Connect 
				console.log('Error: could not find connection for ' + connectionSettings.host);
			}
		};

		/**
		 * Check for route changes
		 */
		$rootScope.$on( "$routeChangeSuccess",
			function ( event ) {
				var location = $location.path();
				if($route.current && 
					'hasBackgroundImage' in $route.current &&
					$route.current.hasBackgroundImage){
					if('forcedBackgroundImage' in $route.current){
						$scope.poster = $route.current.forcedBackgroundImage;
					}
					else if('fallbackBackgroundImage' in $route.current){
						if(BackgroundImage.getCurrentImage() === null){
							$scope.poster = $route.current.fallbackBackgroundImage;
						}
						else{
							$scope.poster = BackgroundImage.getCurrentImage();
						}
					}
					else{
						$scope.poster = BackgroundImage.getCurrentImage();
					}
					}
					else{
						$scope.poster = "";
					}
		});


});
