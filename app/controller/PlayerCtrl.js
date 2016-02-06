noisedWeb.controller('PlayerCtrl', function($scope,BackgroundImage,ConnectionManager,Command,Playback){
	Playback.refresh();
	$scope.albumImage = "app/img/insomiac.jpg";
	$scope.isPlaying = Playback.isPlaying;
	$scope.currentMediaItem = Playback.isPlaying;
	$scope.currentArtist = null;
	$scope.menuStatus = {
		isopen: false
	};

	$scope.$watch(
		function(){return Playback.isPlaying},
		function(newVal){
			$scope.isPlaying = newVal;
		}
	);

	$scope.$watch(
		function(){return Playback.currentMediaItem},
		function(newVal){
			$scope.currentMediaItem = newVal;
			$scope.currentArtist = null;
			if(newVal != null){
				if(newVal.MetaData.Artists.length > 0 && newVal.MetaData.Artists[0] != null){
					$scope.currentArtist = newVal.MetaData.Artists[0];
				}
				else{
					$scope.currentArtist = "Unknown artist";
				}
			}
		}
	)

	//$scope.HelloWorld = function(){
	//	BackgroundImage.setCurrentImage("app/img/greenDay.jpg");
	//}

	$scope.stop = function(){
		Playback.stopPlayback();
	}

	$scope.pause = function(){
		Playback.pausePlayback();
	}

	$scope.resume = function(){
		Playback.resumePlayback();
	}

	$scope.next = function(){
		Playback.next();
	}
});
