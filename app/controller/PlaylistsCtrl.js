noisedWeb.controller('PlaylistsCtrl', function($scope,Playlists){
    Playlists.refresh();
    $scope.playlists = Playlists.playlists;
    $scope.selectedPlaylist = null;

    $scope.$watch(
        function(){ return Playlists.playlists},

        function(newVal){
            $scope.playlists = newVal;
        });

    $scope.createPlaylist = function(){
        Playlists.createPlaylist("123" + new Date().getSeconds());
    }

    $scope.deletePlaylist = function(){
        Playlists.deletePlaylist("123");
    }

    $scope.selectPlaylist = function(playlist){
        $scope.selectedPlaylist = playlist;
    }
});
