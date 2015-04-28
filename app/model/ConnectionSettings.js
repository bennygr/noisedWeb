//Contains parameter which describes a server
function ConnectionSettings(host, description, username, password){
	this.id = new Date().getTime();
	this.host = host;
	this.description = description;
	this.username = username;
	this.password = password;
	this.session = null;
};
