//Has functionality to send commands to servers
noisedWeb.factory('Command',function(){

	//The current protocol version
	var protocolVersion = "1.0";

	//a list of callbacks which will be called 
	//on receiving a response from the server
	var responseCallbacks = [];

	return{

		//registering a callback which will be called 
		//when receiving any responses from a server
		//parameter responseCallback: callback which will be called
		registerResponseCallback: function(responseCallback){
			registerResponseCallback(responseCallback,null);
		},

		//registering a callback which will be called 
		//when receiving a special responses from a server
		//parameter responseCallback: callback which will be called
		//parameter filter: A regular expression matching commands to receive callbacks for
		//					or null to receive callbacks for all commands
		registerResponseCallback: function(responseCallback,filter){
			var callback = {
				callback: responseCallback,
				commandFilter: filter
			}
			responseCallbacks.push(callback);
		},

		unregisterResponseCallback: function(responseCallback){
			for(var i=0;i<responseCallbacks.length; i++){
				var callback = responseCallbacks[i];
				if(callback.callback == responseCallback){
					responseCallbacks.slice(i,1);
					break;
				}
			}
		},

		//sends a command to a given connection
		sendCommand: function(connection, command){
			command.protocolVersion = protocolVersion;
			var commandString = JSON.stringify(command);
			commandString += "{NOISEDEOC}";
			connection.socket.send(commandString);
		},

		//invokes all registerd callbacks with the received response
		announceResponse: function(connection, response){
			for(var i=0;i<responseCallbacks.length; i++){
				var callback = responseCallbacks[i];
				if(callback.commandFilter == null || 
					callback.commandFilter.test(response.Name)){
					responseCallbacks[i].callback(connection,response);
				}
			}
		}
	};
});
