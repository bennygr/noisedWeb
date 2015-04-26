//An active connection to a noised server
function Connection(url, port, description, username, password, socket){
	this.id = new Date().getTime();
	this.url = url;
	this.port = port;
	this.description = description;
	this.password = password;
	this.socket = socket;
}
