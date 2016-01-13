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
        .state("editArticle", {
                url : "/editArticle",
                params : {"id" : undefined, "title" : undefined, "content" : undefined, "date" : undefined},
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/newArticle.html"}
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

app.controller("articleCtrl", function ($scope, $http, $location, $state) {
    console.log($location.path());
	$http.get("http://localhost:8080/app/articles/")
    .then(function(res) {
    	$scope.articles = res.data;

    });

    $scope.deleteArticle = function function_name (id) {
    	$http.delete("http://localhost:8080/app/article/" + id)
    	.then(function(res) {
            $("#" + id).remove();});}

    $scope.editArticle = function function_name (id, title, content, date) {
        var article = {
            id : id,
            title : title,
            content : content,
            date : date
        };
        $state.go('editArticle', article);
    }
});

app.controller("newArticle", function ($scope, $http, $state, $stateParams) {
    $scope.newArticle = {};
    if ($state.current.name == "editArticle") {
        $scope.newArticle.id = $stateParams.id;
        $scope.newArticle.title = $stateParams.title;
        $scope.newArticle.content = $stateParams.content;
    };

    $scope.addNewArticle = function () {
        $scope.newArticle.date = new Date();
        if ($state.current.name == "addArticle") {
            $http.post("http://localhost:8080/app/article", $scope.newArticle)
            .then(function(res) {
                console.log("envoyé");
                $state.go('home');

            });
        }

        else{
            console.log($scope.newArticle);
            $http.put("http://localhost:8080/app/article", $scope.newArticle)
            .then(function(res) {
                console.log("mis a jour");
                $state.go('home');

            });
        }
    }
});
