noisedWeb.controller('BrowserCtrl', function($scope,
											 ConnectionSettingsStorage,
											 ConnectionManager,
											 Command){
	$scope.searchInput = null;
	$scope.searchValue = null;
	$scope.mediaItems = null;
	$scope.artists = null;

	$scope.search = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Search',
						'Parameters': [$scope.searchInput]
					};  
			Command.sendCommand(connection,command);
		}
	}
	
	var searchResultHandler = function(connection, response){
		var resultList = response.Parameters[0][0].MediaItems;
		$scope.mediaItems = resultList;
		$scope.searchValue = $scope.searchInput;
		$scope.artists = getArtists(resultList);
		$scope.$digest();
	}

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
	}

	var isInArrayIgnoreCase = function(array,value){
		for(var i=0;i<array.length;i++){
			if(array[i].toUpperCase() === value.toUpperCase()){
				return true;
			}
		}
		return false;
	}

	Command.registerResponseCallback(searchResultHandler,/Noised.\Commands\.Core\.Search/);
});
