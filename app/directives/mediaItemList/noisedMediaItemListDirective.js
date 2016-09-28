/**
 * A directive for displaying a set of noised media items in a list like view
 */
noisedWeb.directive('noisedMediaItemList',function(){

    var controller = ['$scope', function ($scope) {

        function init() {
            $scope.items = angular.copy($scope.datasource);
        }

        init();
    }] ;
    return{
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItemList/noisedMediaItemListDirective.html',
        scope: {
            items: "=items",
        },
        controller: controller
    };
});
