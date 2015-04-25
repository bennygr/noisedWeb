noisedWeb.factory('Theme',function(){
	var themes = [
		{ 
			name: "darkly",
          	path: "bower_components/bootstrap/dist/css/darkly.min.css",
		},		
		{ 
			name: "cyborg",
          	path: "bower_components/bootstrap/dist/css/cyborg.min.css",
		},		
		{ 
			name: "slate",
          	path: "bower_components/bootstrap/dist/css/slate.min.css",
		},		
		{ 
			name: "superhero",
          	path: "bower_components/bootstrap/dist/css/superhero.min.css",
		},		
		{ 
			name: "paper",
          	path: "bower_components/bootstrap/dist/css/paper.min.css",
		},		
		{ 
			name: "simplex",
          	path: "bower_components/bootstrap/dist/css/simplex.min.css",
		},		
		{ 
			name: "flatly",
          	path: "bower_components/bootstrap/dist/css/flatly.min.css",
		}	
  	];

	var currentTheme = themes[0];

	return{
		getCurrentTheme: function(){
			return currentTheme;
		},

		getThemes: function(){
			return themes;
		},

		setCurrentTheme: function(theme){
			currentTheme = theme;
		}
	};
});
