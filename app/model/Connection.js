//An active connection to a noised server
function Connection(host, port, url, description, username, password, socket, connectionIdentifier){
	this.id = new Date().getTime();
	this.host = host;
	this.port = port;
	this.url = url;
	this.description = description;
	this.password = password;
	this.socket = socket;
	this.connectionIdentifier = connectionIdentifier;
}
