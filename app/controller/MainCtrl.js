
noisedWeb.controller('MainCtrl', function($scope,$rootScope,$location,BackgroundImage,Theme){

	$scope.theme = "";
	$scope.poster= "";
	//Watch for theme changes
	$scope.$watch(function(){ 
					return Theme.getCurrentTheme();
				  }, 
				  function (newTheme){
					$scope.theme = newTheme;
				  },
				  true);
	//Watch for background image changes
	$scope.$watch(function(){ 
					return BackgroundImage.getCurrentImage();
				  }, 
				  function (newImage){
					$scope.poster = newImage;
				  },
				  true);

	$rootScope.$on(
		"$routeChangeSuccess",
		function ( event ) {
			var location = $location.path();
			if(location === "/player"){
				$scope.poster = BackgroundImage.getCurrentImage();
			}
			else{
				$scope.poster = "";
			}
			
		}
	);
});
