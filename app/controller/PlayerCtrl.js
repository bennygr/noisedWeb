noisedWeb.controller('PlayerCtrl', function($scope,BackgroundImage){
	$scope.albumImage = "app/img/insomiac.jpg";

	$scope.HelloWorld = function(){
		BackgroundImage.setCurrentImage("app/img/greenDay.jpg");
	}
});
