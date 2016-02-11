noisedWeb.controller('QueueCtrl', function($scope,Queue){
	Queue.refresh();
	$scope.content = Queue.content;

	$scope.$watch(
		function(){return Queue.content},
		function(newVal){
			$scope.content = newVal;
		}
	);

	$scope.isQueueEmpty = function(){
		return $scope.content === null || $scope.content.length == 0;
	}

	$scope.clear = function(){
		Queue.clear();
	}
});
