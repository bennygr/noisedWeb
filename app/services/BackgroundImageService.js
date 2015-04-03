noisedWeb.factory('BackgroundImage',function(){
	var backgroundImage = null;
	//var backgroundImage = "app/img/default.jpg";
	return{
		getCurrentImage: function(){
			return backgroundImage;
		},

		setCurrentImage: function(image){
			backgroundImage = image;
		}
	};
});
