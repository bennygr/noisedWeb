noisedWeb.factory('ConnectionSettings',function(Command,Storage){
	var storageName = "ConnectionsSettings";

	return{
		getSettings: function(){
			return Storage.getSettings(storageName);
		},

		addSettings: function(newSettings){
			Storage.addSettings(storageName,newSettings);
		},

		clearSettings: function(){
			Storage.clearSettings(storageName);
		},
	}
});
