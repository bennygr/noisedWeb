/**
 * A directive for displaying a noised media item as a simple list itme
 */
noisedWeb.directive('noisedMediaItemListEntry',function(Playback,Queue){

    var controller = ['$scope', function ($scope) {
        //Invokes the remove callback with the current listable item
        $scope.remove = function(){
            $scope.removeClb($scope.item);
        }
    }] ;

    return {
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItemListEntry/noisedMediaItemListEntryDirective.html',
        scope: {
            //= for two way data binding
            item: "=",
            //Boolean which controls whether or not to show the remove button
            hideRemoveButton :"=",
            //A callback called when the remove button is clicked 
            removeClb: "&"
        },
        controller: controller
    };
});

