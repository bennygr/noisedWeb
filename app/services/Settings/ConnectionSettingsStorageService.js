noisedWeb.factory('ConnectionSettingsStorage',function(Command,Storage){
	var storageKey = "connection_settings";

	var	addSettingsInternal =  function(newSettings){
		var settingsString = Storage.getSettings(storageKey);
		var settings = [];
		if(settingsString){
			settings = JSON.parse(settingsString);
		}
		settings.push(newSettings);
		Storage.setSettings(storageKey,JSON.stringify(settings));
	};

	var setSettingsInternal = function(settingsArray){
		Storage.setSettings(storageKey,JSON.stringify(settingsArray));	
	};

	return{
		getAllSettings: function(){
			var settingsString = Storage.getSettings(storageKey);
			if(settingsString){
				return JSON.parse(settingsString);
			}
			return [];
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

		removeSettings: function(settingsToRemove){
			var allSettings = this.getAllSettings();
			for(var i=0; i<allSettings.length; i++){
				var settings = allSettings[i];
				if(settings.host === settingsToRemove.host){
					allSettings.splice(i,1);
					break;
				}
			}

			setSettingsInternal(allSettings);
		},

		addSettings: function(newSettings){
			addSettingsInternal(newSettings);
		},

		clearSettings: function(){
			Storage.clearSettings(storageKey);
		},
	}
});
