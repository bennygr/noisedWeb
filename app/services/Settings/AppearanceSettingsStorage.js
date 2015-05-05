noisedWeb.factory('AppearanceSettingsStorage',function(Theme,Storage){
	var uiThemeStorageKey = "appearance_ui_theme";

	return{
		getUiTheme: function(){
			return JSON.parse(Storage.getSettings(uiThemeStorageKey));
		},
		setUiTheme: function(fullPathUiTheme){
			Storage.setSettings(uiThemeStorageKey,JSON.stringify(fullPathUiTheme));
		}
	}
});
