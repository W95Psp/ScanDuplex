var app = angular.module('PDF',[]);

var SC;
var last = -1;
app.controller('main', function($scope, $parse) {
	SC = $scope;
	$scope.pdfs = data;
	SC.A = data[1];
	SC.B = data[0];
	last = SC.B;
	SC.change = function(index){
		console.log(index);
		if($scope.A===null)
			$scope.A = $scope.pdfs[index];
		else if($scope.B===null)
			$scope.B = $scope.pdfs[index];
	}
	SC.reset = function(){
		SC.A = null;
		SC.B = null;
	}
	SC.ch = function(str){
		window.location = str;
	}
});

