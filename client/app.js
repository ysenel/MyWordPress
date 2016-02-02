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
					"content" : {templateUrl: "template/main_menu.html"}
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
        .state("editPage", {
                url : "/editPage",
                params : {"id" : undefined, "title" : undefined, "content" : undefined, "date" : undefined},
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/newPage.html"}
                }
            }
        )
        .state("articles", {
                url : "/articles",
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/articles.html"}
                }
            }
        )
        .state("page", {
                url : "/page/:page_id",
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/page.html"}
                }
            }
        )
        .state("pages", {
                url : "/pages",
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/pages.html"}
                }
            }
        )
        .state("addPage", {
                url : "/addPage",
                views : {
                    "header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/newPage.html"}
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
	$http.get("http://localhost:8080/app/articles/")
    .then(function(res) {
    	$scope.articles = res.data;

    });

    $scope.deleteArticle = function function_name (id) {
    	$http.delete("http://localhost:8080/app/article/" + id)
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
});

app.controller("pagesCtrl", function ($scope, $http, $location, $state) {
	$http.get("http://localhost:8080/app/pages/")
    .then(function(res) {
    	$scope.pages = res.data;

    });

    $scope.deletePage = function function_name (id) {
    	$http.delete("http://localhost:8080/app/page/" + id)
    	.then(function(res) {
            $("#" + id).toggle( "slide" , 500);
        })
    ;}

    $scope.editPage = function function_name (id, title, content, date) {
        var page = {
            id : id,
            title : title,
            content : content,
            date : date
        };
        $state.go('editPage', page);
    }
});


app.controller("headerCtrl", function ($scope, $http, $location, $state) {
    $http.get("http://localhost:8080/app/pages/")
    .then(function(res) {
        $scope.pages = res.data;
    });

    /*$scope.deleteArticle = function function_name (id) {
        $http.delete("http://localhost:8080/app/article/" + id)
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
    }*/
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
                $state.go('articles');

            });
        }

        else{
            console.log($scope.newArticle);
            $http.put("http://localhost:8080/app/article", $scope.newArticle)
            .then(function(res) {
                console.log("mis a jour");
                $state.go('articles');

            });
        }
    }
});

app.controller("newPage", function ($scope, $http, $state, $stateParams) {
    $scope.newPage = {};
    if ($state.current.name == "editPage") {
        $scope.newPage.id = $stateParams.id;
        $scope.newPage.title = $stateParams.title;
        $scope.newPage.content = $stateParams.content;
    };

    $scope.addNewPage = function () {
        $scope.newPage.date = new Date();
        if ($state.current.name == "addPage") {
            $http.post("http://localhost:8080/app/page", $scope.newPage)
            .then(function(res) {
                console.log("envoyé");
                $state.go('pages');

            });
        }

        else{
            $http.put("http://localhost:8080/app/page", $scope.newPage)
            .then(function(res) {
                console.log("mis à jour");
                $state.go('pages');

            });
        }
    }
});

app.controller("pageCtrl", function ($scope, $http, $location, $state, $stateParams) {

    console.log($stateParams.page_id);
    $http.get("http://localhost:8080/app/page/" + $stateParams.page_id)
    .then(function(res) {
        $scope.page = res.data;
    });

    $scope.deletePage = function function_name (id) {
        $http.delete("http://localhost:8080/app/page/" + id)
        .then(function(res) {
            $("#" + id).toggle( "slide" , 500);
            $state.go('home');
        })
    ;}

    $scope.editPage = function function_name (id, title, content, date) {
        var page = {
            id : id,
            title : title,
            content : content,
            date : date
        };
        $state.go('editPage', page);
    }
});
