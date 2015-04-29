
noisedWeb.factory('Storage',function(){
	var keyBase =  "noised_preferences_";
	return{

		//returns the settings for the given name as array
		getSettings: function(name){
			key = keyBase + name;
			var settingsString = localStorage.getItem(key);
			if(settingsString){
				return JSON.parse(settingsString);
			}
			return [];
		},

		setSettings: function(name, settingsArray){
			key = keyBase + name;
			localStorage.setItem(key,JSON.stringify(settingsArray));
		},

		//Adds an element to the settings array of the given name
		addSettings: function(name,newSettings){
			key = keyBase + name;
			var settings = this.getSettings(name);
			settings.push(newSettings);
			localStorage.setItem(key,JSON.stringify(settings));
		},


		//clears the whole settings array for the given name
		clearSettings: function(name){
			key = keyBase + name;
			localStorage.removeItem(key);
		},
	}
})
