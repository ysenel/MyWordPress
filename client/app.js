var app = angular.module('MyWordPress', ['ui.router']);

app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state("header", {
				views : {
					"header" : {templateUrl: "template/header.html"},
					"article" : {templateUrl: "template/article.html"}
				}
			}
		);
}])

.run(['$state', function ($state) {
   $state.transitionTo('header');
}]);

app.controller("articleCtrl", function ($scope, $http) {
	$http.get("http://localhost:8080/app/articles/")
    .then(function(res) {
    	$scope.articles = res.data;

    });

    $scope.deleteArticle = function function_name (id) {
    	$http.delete("http://localhost:8080/app/article/" + id)
    	.then(function(res) {
    		console.log(res);

    });
    }
});
