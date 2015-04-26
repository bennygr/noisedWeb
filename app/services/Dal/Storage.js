
noisedWeb.factory('Storage',function(Command){
	var keyBase =  "noised_preferences_";
	return{
		getSettings: function(name){
			key = keyBase + name;
			var settingsString = localStorage.getItem(key);
			if(settingsString != null)
				return JSON.parse(settingsString);
			return [];
		},

		addSettings: function(name,newSettings){
			key = keyBase + name;
			var settings = this.getSettings(name);
			settings.push(newSettings);
			localStorage.setItem(key,JSON.stringify(settings));
		},

		clearSettings: function(name){
			key = keyBase + name;
			localStorage.removeItem(key);
		},
	}
})
