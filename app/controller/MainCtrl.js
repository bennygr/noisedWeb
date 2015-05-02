
noisedWeb.controller('MainCtrl', function($scope,
		$rootScope,
		$route,
		$location,
		$modal,
		BackgroundImage,
		Theme){

		$scope.theme = "";
		$scope.poster= "";
		$scope.showBallonOnError = false;

		//Watch for theme changes
		$scope.$watch(function(){ 
			return Theme.getCurrentTheme();
		}, 
		function (newTheme){
			$scope.theme = newTheme;
		}, true);

		//Watch for background image changes
		$scope.$watch(function(){ 
			return BackgroundImage.getCurrentImage();
		}, 
		function (newImage){
			$scope.poster = newImage;
		}, true);

		/*
		 * change current connection
		 */
		$scope.changeCurrentConnection = function(){
			var modalInstance = $modal.open({
					templateUrl: 'app/views/currentConnection.html',
					controller: 'CurrentConnectionCtrl',
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
