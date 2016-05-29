/**
 * A directive for displaying a noised media item
 */
noisedWeb.directive('noisedMediaItem',function(){
    return{
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItem/noisedMediaItemDirective.html',
        scope: {
            item: "=item"
        },
    };
});
