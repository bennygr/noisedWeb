noisedWeb.factory('ConnectionSettingsStorage',function(Command,Storage){
	var storageKey = "connection_settings";
	var connectionSettings = [];

	var loadSettingsInternal = function(){
		var connectionSettingsString = Storage.getSettings(storageKey);
		if(connectionSettingsString)
			connectionSettings = JSON.parse(connectionSettingsString);
	};

	var saveSettingsInternal = function(){
		Storage.setSettings(storageKey,JSON.stringify(connectionSettings));
	}

	var	addSettingsInternal =  function(newSettings){
		connectionSettings.push(newSettings);
		saveSettingsInternal();
	};

	loadSettingsInternal();

	return{
		/**
		 * *Gets all connection settings
		 */
		getAllSettings: function(){
			return connectionSettings;
		},

		/**
		 * Gets connection settings for a special host
		 */
		getSettingsForHost: function(host){
			for(var i=0; i<connectionSettings.length; i++){
				var settings = connectionSettings[i];
				if(settings.host === host)
					return settings;
			}
			return null;
		},

		/**
		 * removes connection settings
		 */
		removeSettings: function(settingsToRemove){
			var changed = false;
			for(var i=0; i<connectionSettings.length; i++){
				var settings = connectionSettings[i];
				if(settings.host === settingsToRemove.host){
					connectionSettings.splice(i,1);
					changed = true;
					break;
				}
			}
			if(changed){
				saveSettingsInternal();
			}
		},

		/**
		 * adds connection settings
		 */
		addSettings: function(newSettings){
			addSettingsInternal(newSettings);
		},

		/**
		 * Deletes all connection settings
		 */
		clearSettings: function(){
			//Clearing the array
			connectionSettings.length = 0;
			Storage.clearSettings(storageKey);
		},
	}
});
