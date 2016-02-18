//handles the noised queue
noisedWeb.service('Playlists',function($rootScope,ConnectionManager,Command){
	var _this = this;
	this.playlists = [];

	this.triggerUpdate = function(){
		$rootScope.$digest()
	};

	this.refresh = function(){
		var command = 
				{ 
                                    'Name': 'Noised.Plugins.Commands.CoreCommands.GetPlaylists'
				};  
		ConnectionManager.sendCommand(command);
	};

	this.createPlaylist = function(name){
		var command = 
				{ 
					'Name': 'Noised.Plugins.Commands.CoreCommands.CreatePlaylist',
					'Parameters': [name]
				};  
		ConnectionManager.sendCommand(command);
	}

	this.deletePlaylist = function(name){
		var command = 
				{ 
					'Name': 'Noised.Plugins.Commands.CoreCommands.DeletePlaylist',
					'Parameters': [name]
				};  
		ConnectionManager.sendCommand(command);
	}

        this.addToPlaylist = function(playlist, item){
		var command = { 
                    'Name': 'Noised.Plugins.Commands.CoreCommands.AddToPlaylist',
                    'Parameters': [playlist.Name,[item.Uri]]
                };  
                ConnectionManager.sendCommand(command);
        }

	this.refreshHandler = function(connection, response){
		if(response.Parameters.length > 0) {
			_this.playlists = response.Parameters;
		}
		else{
			_this.playlists = null;
		}
		_this.triggerUpdate();
	};

	Command.registerResponseCallback(this.refreshHandler,/Noised.\Commands\.Core\.GetPlaylists/);
	this.refresh();
})
