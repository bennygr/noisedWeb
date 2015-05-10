//A connection service can handle multiple connections 
//to varios noised daemons (for example: "living room", "Kitchen", etc)
noisedWeb.factory('ConnectionManager',function(Command){

	var connectionList = [];
	var currentConnection = null;

	return{
		/*
		 * Returns a set of current connections
		 */
		getCurrentConnection: function(){
			return currentConnection;
		},

		/**
		 * returns a connected connection by host
		 */
		getConnectionByHost: function(host){
			for(var i=0;i<connectionList.length; i++){
				var current = connectionList[i];
				if(current.host === host){
					return current;
				}
			}
		},

		/**
		 * sets the current active main connection
		 */
		setCurrentConnection: function(connection){
			currentConnection = connection;
		},

		/**
		 * Connectes to a server
		 */
		connectToServer: 
		function(connectionIdentifier, host, description, username, password, errorClb, closeClb){ 
			var port = 1338;
			var url = "ws://" + host;
			var fullUrl = url + ":" + port;
			var socket = new WebSocket(fullUrl);
			socket.binaryType = "arrayBuffer";

			socket.onopen = function(){
				var connection = 
					new Connection(host,
								   port,
								   url,
								   description,
								   username,
								   password,
								   socket,
								   connectionIdentifier);
				connectionList.push(connection);

				currentConnection = connection;

				//Sending a login to the server
				Command.sendCommand(
					connection,
					{ 
						'Name': 'Noised.Plugins.Commands.CoreCommands.Login',
						'Parameters': [username, password]
					});  
			}

			socket.onclose = function(event){
				var index = -1;
				var closeConnection = null;
				for(var i=0;i<connectionList.length; i++){
					var connection = connectionList[i];
					if(connection.socket === socket){
						closeConnection = connection;
						index = i;
						break;
					}
				}
				if(index > -1){
					connectionList.splice(index,1);
				}

				if(closeClb != null){
					closeClb(closeConnection,event.code);
				}
			}

			socket.onerror = function(error) {
				var errorConnection = null;

				//check if we have a valid connection
				for(var i=0;i<connectionList.length; i++){
					var connection = connectionList[i];
					if(connection.socket === socket){
						errorConnection = connection;
						break;
					}
				}

				//Callback
				if(errorClb != null){
					errorClb(errorConnection,error);
				}
			};

			socket.onmessage = function(message){
				for(var i=0;i<connectionList.length; i++){
					var connection = connectionList[i];
					if(connection.socket === socket){
						var response = JSON.parse(message.data);
						Command.announceResponse(connection,response);
						break;
					}
				}
			}
		},

		/**
		 * Closes a connection 
		 */
		disconnectFromServer: function(connection){
			for(var i=0;i<connectionList.length; i++){
				var current = connectionList[i];
				if(current === connection){
					current.socket.close();
					break;
				}
			}
		}
	};
});

