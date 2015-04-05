noisedWeb.factory('BackgroundImage',function(){
	var backgroundImage = null;
	return{
		getCurrentImage: function(){
			return backgroundImage;
		},

		setCurrentImage: function(image){
			backgroundImage = image;
		}
	};
});
