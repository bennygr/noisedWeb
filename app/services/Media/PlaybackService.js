
//handles playback state
noisedWeb.service('Playback',function($rootScope,ConnectionManager,Command){

	var _this = this;
	this.isPlaying = false;
	this.currentMediaItem = null;

	this.triggerUpdate = function(){
		$rootScope.$digest()
	};

	this.playHandler = function(connection, response){
		if(response.Parameters.length > 0 && response.Parameters[0] != null){
			_this.currentMediaItem = response.Parameters[0];
		}
		_this.isPlaying = true;
		_this.triggerUpdate();
	};

	this.pauseHandler = function(connection, response){
		_this.isPlaying = false;
		_this.triggerUpdate();
	};

	this.stopHandler = function(connection, response){
		_this.isPlaying = false;
		_this.currentMediaItem = null;
		_this.triggerUpdate();
	};

	this.refreshHandler = function(connection, response){
		if(response.Parameters.length > 0 && response.Parameters[0] != null){
			_this.currentMediaItem = response.Parameters[0];
			_this.isPlaying = true;
		}
		else{
			_this.isPlaying = false;
		}
		_this.triggerUpdate();
	};

	this.stopPlayback = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Stop'
					};  
			Command.sendCommand(connection,command);
		}
	};

	this.pausePlayback = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Pause'
					};  
			Command.sendCommand(connection,command);
		}
	};

	this.resumePlayback = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Resume'
					};  
			Command.sendCommand(connection,command);
		}
	}

	this.refresh = function(){
		var connection = ConnectionManager.getCurrentConnection();
		if(connection){
			var command = 
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.GetCurrentMediaItem'
					};  
			Command.sendCommand(connection,command);
		}
	};

	Command.registerResponseCallback(this.playHandler,/Noised.\Commands\.Core\.Play/);
	Command.registerResponseCallback(this.pauseHandler,/Noised.\Commands\.Core\.Pause/);
	Command.registerResponseCallback(this.stopHandler,/Noised.\Commands\.Core\.Stop/);
	Command.registerResponseCallback(this.refreshHandler,/Noised.\Commands\.Core\.GetCurrentMediaItem/);
	this.refresh();
})
