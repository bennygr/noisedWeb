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

		removeSetings: function(settingsToRemove){
			var allSettings = Storage.getSettings(storageName);
			for(var i=0; i<allSettings.length; i++){
				var settings = allSettings[i];
				if(settings.host === settingsToRemove.host){
					allSettings.splice(i,1);
					break;
				}
			}
			Storage.setSettings(storageName,allSettings);
		},

		addSettings: function(newSettings){
			Storage.addSettings(storageName,newSettings);
		},

		clearSettings: function(){
			Storage.clearSettings(storageName);
		},
	}
});
