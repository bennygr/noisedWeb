noisedWeb.factory('ConnectionSettingsStorage',function(Command,Storage){

	var storageName = "connection_settings";

	return{

		getAllSettings: function(){
			return Storage.getSettings(storageName);
		},

		getSettingsForHost: function(host){
			var allSettings = this.getAllSettings();
			for(var i=0; i<allSettings.length; i++){
				var settings = allSettings[i];
				if(settings.host === host)
					return settings;
			}
			return null;
		},

		addSettings: function(newSettings){
			Storage.addSettings(storageName,newSettings);
		},

		clearSettings: function(){
			Storage.clearSettings(storageName);
		},
	}
});
