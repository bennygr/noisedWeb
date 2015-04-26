//Contains parameter which describes a server
function ConnectionParameter(url, description, username, password){
	this.id = new Date().getTime();
	this.url = url;
	this.description = description;
	this.username = username;
	this.password = password;
	this.session = null;
};
