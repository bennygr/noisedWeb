noisedWeb.controller('PlaylistsCtrl', function($scope,Playlists){
	Playlists.refresh();
	$scope.playlists = Playlists.playlists;

	$scope.$watch(
		function(){return Playlists.playlists},
		function(newVal){
			$scope.playlists = newVal;
		}
	);

	$scope.createPlaylist = function(){
		Playlists.createPlaylist("123");
	}
	$scope.deletePlaylist = function(){
		Playlists.deletePlaylist("123");
	}
});
