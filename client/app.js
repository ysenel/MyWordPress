var app = angular.module('MyWordPress', ['ui.router', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.otherwise({redirectTo : "/"});
});

app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("home", {
                url : "/",
				views : {
					"header" : {templateUrl: "template/header.html"},
					"content" : {templateUrl: "template/article.html"}
				}
			}
		)
        .state("addArticle", {
                url : "/addArticle",
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/newArticle.html"}
                }
            }
        );
}])

.run(['$state', function ($state) {
   $state.transitionTo('home');
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
            $("#" + id).remove();

    });
    }
});

app.controller("newArticle", function ($scope, $http, $state) {
    $scope.newArticle = {};
    $scope.newArticle.date = new Date();
    $scope.addNewArticle = function () {
        console.log($scope.newArticle.title)
        $http.post("http://localhost:8080/app/article", $scope.newArticle)
        .then(function(res) {
            console.log("envoyé");
            $state.go('home');

    });
    }
});
