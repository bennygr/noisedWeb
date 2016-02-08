//handles the noised queue
noisedWeb.service('Queue',function($rootScope,ConnectionManager,Command){
	var _this = this;
	this.queue = [];

	this.triggerUpdate = function(){
		$rootScope.$digest()
	};

	this.refreshHandler = function(connection, response){
		if(response.Parameters.length > 0) {
			_this.queue = response.Parameters;
		}
		_this.triggerUpdate();
	};

	this.enqueue = function(mediaItem){
		var command =
				{ 
					'Name': 'Noised.Plugins.Commands.CoreCommands.Enqueue',
					'Parameters': [[mediaItem.Uri]]
				};  
		ConnectionManager.sendCommand(command);
	}

	this.refresh = function(){
		var command = 
				{ 
					'Name': 'Noised.Plugins.Commands.CoreCommands.GetQueue'
				};  
		ConnectionManager.sendCommand(command);
	};


	Command.registerResponseCallback(this.refreshHandler,/Noised.\Commands\.Core\.GetQueue/);
	this.refresh();
})