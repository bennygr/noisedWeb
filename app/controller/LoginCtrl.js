noisedWeb.controller('LoginCtrl', function($scope,ConnectionManager,Command){
	$scope.HelloWorld = function(){
		ConnectionManager.connectToServer("ws://localhost",1338,"dd","benny","test");
	}

	Command.registerResponseCallback(function(connection,response){
		alert("GOT AN RESP: " + connection.url);
		alert("GOT AN RESP: " + response.Name);
	});
});
