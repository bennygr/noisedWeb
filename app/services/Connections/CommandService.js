
//Has functionality to send commands to servers
noisedWeb.factory('Command',function(){

	//The current protocol version
	var protocolVersion = "1.0";

	//a list of callbacks which will be called 
	//on receiving a response from the server
	var responseCallbacks = [];

	return{

		//registering a callback which will be called 
		//when receiving responses from a server
		registerResponseCallback: function(responseCallback){
			responseCallbacks.push(responseCallback);
		},

		//sends a command to a server
		sendCommand: function(connection, command){
			command.protocolVersion = protocolVersion;
			var commandString = JSON.stringify(command);
			commandString += "{NOISEDEOC}";
			connection.socket.send(commandString);
		},

		//invokes all register response callbacks with 
		//the received response
		announceResponse: function(connection, response){
			for(var i=0;i<responseCallbacks.length; i++){
				responseCallbacks[i](connection,response);
			}
		}
	};
});
