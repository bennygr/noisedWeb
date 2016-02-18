noisedWeb.controller('BrowserCtrl', function($scope, 
                                             ConnectionSettingsStorage,
                                             ConnectionManager,
                                             Command,
                                             Playlists,
                                             Queue){

    $scope.searchInput = null;
    $scope.searchValue = null;
    $scope.mediaItems = null;
    $scope.artists = null;
    $scope.playlists = Playlists.playlists;
            
    $scope.menuStatus = {
        isopen: false
    };

    $scope.$watch(
        function(){return Playlists.playlists},
        function(newVal){
            $scope.playlists = newVal;
        });

    $scope.search = function(){
        var command = { 
            'Name': 'Noised.Plugins.Commands.CoreCommands.Search',
            'Parameters': [$scope.searchInput]
        };  
        ConnectionManager.sendCommand(command);
    };

    $scope.play = function(item){
        var command = { 
            'Name': 'Noised.Plugins.Commands.CoreCommands.Play',
            'Parameters': [item.Uri]
        };  
        ConnectionManager.sendCommand(command);
    };

    $scope.enqueue = function(item){
        Queue.enqueue(item);
    };

    $scope.addToPlaylist = function(playlist, item){
        Playlists.addToPlaylist(playlist,item);
    }

    var searchResultHandler = function(connection, response){
        var resultList = response.Parameters[0][0].MediaItems;
        $scope.mediaItems = resultList;
        $scope.searchValue = $scope.searchInput;
        $scope.artists = getArtists(resultList);
        $scope.albums = getAlbums(resultList);
        $scope.$apply();
    };

    //Helper function to extract a unique list of artists from the mediaItems result
    var getArtists = function(mediaItems){
        var artists = [];
        for(var i=0; i<mediaItems.length; i++){
            var itemArtists = mediaItems[i].MetaData.Artists;
            itemArtists = itemArtists.concat(mediaItems[i].MetaData.AlbumArtists);
            for(var a=0; a<itemArtists.length; a++){
                if(!isInArrayIgnoreCase(artists,itemArtists[a])){
                    artists.push(itemArtists[a]);
                }
            }
        }
        return artists;
    };

    var getAlbums = function(mediaItems){
        var albums = [];
        for(var i=0; i<mediaItems.length; i++){
            var album = mediaItems[i].MetaData.Album;
            if(!isInArrayIgnoreCase(albums,mediaItems[i].MetaData.Album)){
                albums.push(mediaItems[i].MetaData.Album);
            }
        }
        return albums;
    };

    var isInArrayIgnoreCase = function(array,value){
        for(var i=0;i<array.length;i++){
            if(array[i].toUpperCase() === value.toUpperCase()){
                return true;
            }
        }
        return false;
    };

    Command.registerResponseCallback(searchResultHandler,/Noised.\Commands\.Core\.Search/); 
});
