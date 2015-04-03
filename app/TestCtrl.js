
testApp.controller('TestCtrl', function($scope,Theme){

	$scope.Theme = null;

	$scope.CustomTheme = function(){
		return $scope.Theme != null;
	}

	//Set a new theme
	$scope.SwitchTheme = function(name){
		Theme.setCurrentTheme(name);
	};
	
	//Watch for theme changes
	$scope.$watch(function(){ 
					return Theme.getCurrentTheme();
				  }, 
				  function (newTheme){
					$scope.Theme = newTheme;
				  },
				  true);
});
