testApp.factory('Theme',function(){
	//var currentTheme = "bower_components/bootstrap/dist/css/cyborg.min.css";
	//var currentTheme = "bower_components/bootstrap/dist/css/darkly.min.css";
	var currentTheme = "bower_components/bootstrap/dist/css/slate.min.css";
	//var currentTheme = "bower_components/bootstrap/dist/css/superhero.min.css";
	//var currentTheme = "bower_components/bootstrap/dist/css/paper.min.css";
	//var currentTheme = "bower_components/bootstrap/dist/css/simplex.min.css";
	//var currentTheme = "bower_components/bootstrap/dist/css/flatly.min.css";
	//var currentTheme = null;
	return{
		getCurrentTheme: function(){
			return currentTheme;
		},

		setCurrentTheme: function(theme){
			currentTheme = theme;
		}
	};
});
