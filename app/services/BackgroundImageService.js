noisedWeb.factory('BackgroundImage',function(){
	var backgroundImage = "app/img/music.jpg";
	return{
		getCurrentImage: function(){
			return backgroundImage;
		},

		setCurrentImage: function(image){
			backgroundImage = image;
		}
	};
});
