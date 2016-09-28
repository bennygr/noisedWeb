/**
 * A directive for displaying a noised media item
 */
noisedWeb.directive('noisedMediaItem',function(Playback,Queue){

    var controller = ['$scope', function ($scope) {

        function init() {
            $scope.items = angular.copy($scope.datasource);
        }

        init();

        $scope.play = function() {
            Playback.play($scope.item);
        }

        $scope.enqueue = function(){
            Queue.enqueue($scope.item);
        }
    }] ;

    return {
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItem/noisedMediaItemDirective.html',
        scope: {
            item: "=",
        },
        controller: controller
    };
});
