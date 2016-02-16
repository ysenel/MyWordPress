angular.module('MyWordPress.admin.articles', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("articles", {
                    url : "/articles",
                    views : {
                        "header" : {templateUrl: "admin/template/header.html"},
                        "content" : {templateUrl: "admin/articles/articles.html"}
                    }
                }
            )
        .state("addArticle", {
                    url : "/addArticle",
                    views : {
                        "header" : {templateUrl: "admin/template/header.html"},
                        "content" : {templateUrl: "admin/articles/newArticle.html"}
                    }
                }
            )
        .state("editArticle", {
                url : "/editArticle",
                params : {"id" : undefined, "title" : undefined, "content" : undefined, "date" : undefined},
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/articles/newArticle.html"}
                }
            }
        );

}])

.controller("articleCtrl", function ($scope, $http, $location, $state) {
    $http.get("http://localhost:23456/app/articles/")
    .then(function(res) {
        $scope.articles = res.data;
    });

    $scope.deleteArticle = function function_name (id) {
    	$http.delete("http://localhost:23456/app/article/" + id)
    	.then(function(res) {
            $("#" + id).toggle( "slide" , 500);
        })
    ;}

    $scope.editArticle = function function_name (id, title, content, date) {
        var article = {
            id : id,
            title : title,
            content : content,
            date : date
        };
        $state.go('editArticle', article);
    }
})

.controller("newArticle", function ($scope, $http, $state, $stateParams) {
    $scope.newArticle = {};
    if ($state.current.name == "editArticle") {
        $scope.newArticle.id = $stateParams.id;
        $scope.newArticle.title = $stateParams.title;
        $scope.newArticle.content = $stateParams.content;
    };

    $scope.addNewArticle = function () {
        $scope.newArticle.date = new Date();
        if ($state.current.name == "addArticle") {
            $http.post("http://localhost:23456/app/article", $scope.newArticle)
            .then(function(res) {
                $state.go('articles');
            });
        }
        else{
            $http.put("http://localhost:23456/app/article", $scope.newArticle)
            .then(function(res) {
                console.log("mis a jour");
                $state.go('articles');
            });
        }
    }
})
