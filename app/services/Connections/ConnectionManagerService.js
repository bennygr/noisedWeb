//A connection service can handle multiple connections 
//to varios noised daemons (for example: "living room", "Kitchen", etc)
noisedWeb.factory('ConnectionManager',function(Command){

	var connectionList = [];
	var currentConnection = null;

	return{

		//Gets the current active connection
		getCurrentConnection: function(){
			return currentConnection;
		},

		//Sets the current active connection
		setCurrentConnection: function(connection){
			currentConnection = connection;
		},

		//Connects to a server
		connectToServer: 
		function(url, port, description, username, password){ 

			var fullUrl = url + ":" + port;
			var socket = new WebSocket(fullUrl);
			socket.binaryType = "arrayBuffer";

			socket.onopen = function(){
				var connection = 
					new Connection(url,
								   port,
								   description,
								   username,
								   password,
								   socket);
				connectionList.push(connection);

				//Sending a login to the server
				Command.sendCommand(
					connection,
					{ 
						'Name': 'Noised.Commands.Core.Login',
						'Parameters': [username, password]
					});  
			}

			socket.onclose = function(){
				alert("closed");
			}

			socket.onerror = function(error) {
				alert('WebSocket Error: ' + error);
			};

			socket.onmessage = function(message){
				for(var i=0;i<connectionList.length; i++){
					var connection = connectionList[i];
					if(connection.socket === socket){
						var response = JSON.parse(message.data);
						Command.announceResponse(connection,response);
					}
				}
			}
		}
	};
});

//A connection to a server
function Connection(url, port, description, username, password, socket){
	this.url = url;
	this.port = port;
	this.description = description;
	this.password = password;
	this.socket = socket;
}

