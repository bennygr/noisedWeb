noisedWeb.controller('LoginCtrl', function($scope,ConnectionManager,Command){
	$scope.Login = function(){
		ConnectionManager.connectToServer("ws://localhost",1338,"dd","benny","test",function(connection,error){
			alert("Error connecting to server");
		},function(connection,code){
			alert("Closed connection. Code: " + code);
		});
	}

	Command.registerResponseCallback(function(connection,response){
		alert("GOT AN RESP: " + connection.url);
		alert("GOT AN RESP: " + response.Name);

	},/Noised\.Commands\.Core\.*/); //Just an example regex: All Core commands
});
