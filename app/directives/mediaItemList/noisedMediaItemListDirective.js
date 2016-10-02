/**
 * A directive for displaying a set of noised media items in a list like view
 */
noisedWeb.directive('noisedMediaItemList',function(){

    var controller = ['$scope', function ($scope) {
    }] ;

    return{
        restrict: 'AEC',
        templateUrl: 'app/directives/mediaItemList/noisedMediaItemListDirective.html',
        scope: {
            ///The listable Item to display 
            listableItems: "=",
            //Boolean which controls whether or not to show the remove button
            hideRemoveButton: "=",
            //A callback called when the remove button is clicked 
            removeClb: "&"
        },
        controller: controller
    };
});
