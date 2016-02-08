var app = angular.module('MyWordPress', ['ui.router', 'ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.otherwise({redirectTo : "/"});
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);

app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("site", {
                url : "/",
        				views : {
        					//"header" : {templateUrl: "template/header.html"},
        					"content" : {templateUrl: "template/site.html"}
        				}
        			}
        		)

        .state("dashboard", {
                url : "/dashboard",
                views : {
                  "header" : {templateUrl: "template/header.html"},
                  "content" : {templateUrl: "template/dashboard.html"}
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
        .state("login", {
                url : "/login",
                views : {
                    //"header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/connection.html"}
                }
            }
        )
        .state("newUser", {
                url : "/newUser",
                views : {
                    //"header" : {templateUrl: "template/header.html"},
                    "content" : {templateUrl: "template/newUser.html"}
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
   $state.transitionTo('site');
}]);

app.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }

    return auth;
});

app.factory('TokenInterceptor', function ($window, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        }
}});

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


app.controller("headerCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {

    $scope.deconnexion = function () {
        AuthenticationService.isLogged = false;
        delete $window.sessionStorage.token;
        $state.go('site');
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
            $state.go('dashboard');
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

app.controller("loginCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {
    $scope.connection_data = {};

    $scope.user_connection = function () {
      $http.post("http://localhost:8080/app/login", $scope.connection_data)
      .then(function(res) {
          if (res.status == 200) {
              AuthenticationService.isLogged = true;
              $window.sessionStorage.token = res.data.token;
              $state.go('dashboard');
          }
      });

    }

});

app.controller("newUserCtrl", function ($scope, $http, $location, $state) {
    $scope.user_data = {};

    $scope.new_user = function () {
      $http.post("http://localhost:8080/app/user", $scope.user_data)
      .then(function(res) {
          console.log("new user envoyé");
          if (res.status == 200) {
              $state.go('site');
          }


      });

    }

});


app.controller("siteCtrl", function ($scope, $http, $location, $state) {

});
