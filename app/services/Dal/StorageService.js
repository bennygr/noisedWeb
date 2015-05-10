
noisedWeb.factory('Storage',function(){
	var keyBase =  "noised_preferences_";
	return{

		getSettings: function(name){
			key = keyBase + name;
			return localStorage.getItem(key);
		},

		setSettings: function(name, settingsArray){
			key = keyBase + name;
			localStorage.setItem(key,settingsArray);
		},

		//clears the whole settings array for the given name
		clearSettings: function(name){
			key = keyBase + name;
			localStorage.removeItem(key);
		},
	}
})
