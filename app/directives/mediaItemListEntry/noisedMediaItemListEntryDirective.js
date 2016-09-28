/**
 * A directive for displaying a noised media item as a simple list itme
 */
noisedWeb.directive('noisedMediaItemListEntry',function(Playback,Queue){

    var controller = ['$scope', function ($scope) {

        function init() {
            $scope.items = angular.copy($scope.datasource);
        }

        init();

        $scope.remove = function(){
            Queue.remove($scope.item);
        }
    }] ;

    return {
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItemListEntry/noisedMediaItemListEntryDirective.html',
        scope: {
            item: "=",
        },
        controller: controller
    };
});

