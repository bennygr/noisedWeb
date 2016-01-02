noisedWeb.controller('BrowserCtrl', function($scope,
											 ConnectionSettingsStorage,
											 ConnectionManager,
											 Command){

	$scope.search = function(){
		var person = prompt("Please enter a search pattern", "Harry Potter");
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Search',
						'Parameters': [person]
					};  
			Command.sendCommand(connection,command);
		}
	}
	
	var searchResultHandler = function(connection, response){
		var p = response.Parameters[0][0].MediaItems;
		alert(p.length + " results found");
		alert(JSON.stringify(p));
	}

	Command.registerResponseCallback(searchResultHandler,/Noised.\Commands\.Core\.Search/);
});
