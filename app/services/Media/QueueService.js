//handles the noised queue
noisedWeb.service('Queue',function($rootScope,ConnectionManager,Command){
	var _this = this;
	this.content = [];

	this.triggerUpdate = function(){
            $rootScope.$digest()
	};

	this.refreshHandler = function(connection, response){
            if(response.Parameters.length > 0) {
                _this.content = response.Parameters;
            }
            else{
                _this.content = null;
            }
            _this.triggerUpdate();
	};

	this.enqueue = function(mediaItem){
            var command = { 
                'Name': 'Noised.Plugins.Commands.CoreCommands.Enqueue',
                'Parameters': [[mediaItem.Uri]]
            };  
            ConnectionManager.sendCommand(command);
	}

	this.remove = function(listableItem){
            var command = { 
                'Name': 'Noised.Plugins.Commands.CoreCommands.RemoveFromQueue',
                'Parameters': [[listableItem.ListId]]
            }; 
            ConnectionManager.sendCommand(command);
	}

	this.refresh = function(){
            var command = { 
                'Name': 'Noised.Plugins.Commands.CoreCommands.GetQueue'
            };  
            ConnectionManager.sendCommand(command);
	};

	this.clear = function(){
            var command = { 
                'Name': 'Noised.Plugins.Commands.CoreCommands.ClearQueue'
            };  
            ConnectionManager.sendCommand(command);
	}

	Command.registerResponseCallback(this.refreshHandler,/Noised.\Commands\.Core\.GetQueue/);
	this.refresh();
})
