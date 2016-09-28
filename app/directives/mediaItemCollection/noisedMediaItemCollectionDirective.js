/**
 * A directive for displaying a set of noised media items  in a collection like view
 */
noisedWeb.directive('noisedMediaItemCollection',function(){

    var controller = ['$scope', function ($scope) {

        function init() {
            $scope.items = angular.copy($scope.datasource);
        }

        init();
    }] ;
    return{
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItemCollection/noisedMediaItemCollectionDirective.html',
        scope: {
            items: "=items",
        },
        controller: controller
    };
});
