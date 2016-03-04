angular.module('MyWordPress.admin.categories', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("categories", {
                url : "/categories",
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/categories/categorie.html"}
                }
            }
        )
        .state("addCategorie", {
                url : "/addCategorie",
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/categories/newCategorie.html"}
                }
            }
        )
        .state("editCategorie", {
                url : "/editCategorie",
                params : {"id" : undefined, "title" : undefined, "date" : undefined},
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/categories/newCategorie.html"}
                }
            }
        );

}])

.controller("categoriesCtrl", function ($scope, $http, $location, $state) {
	$http.get("http://localhost:23456/app/categories/")
    .then(function(res) {
    	$scope.categories = res.data;
    });

    $scope.deleteCategorie = function function_name (categorie_id) {
		$http.delete("http://localhost:23456/app/categorie_articles/" + categorie_id)
		.then(function(res) {
			$http.delete("http://localhost:23456/app/categorie/" + categorie_id)
			.then(function(res) {
				$("#" + categorie_id).toggle( "slide" , 500);
			});
		});
	}

    $scope.editCategorie = function function_name (id, title, date) {
        var page = {
            id : id,
            title : title,
            date : date
        };
        $state.go('editCategorie', page);
    }
})

.controller("newCategorie", function ($scope, $http, $state, $stateParams) {
    $scope.newCategorie = {};
    if ($state.current.name == "editCategorie") {
        $scope.newCategorie.id = $stateParams.id;
        $scope.newCategorie.title = $stateParams.title;
        $scope.newCategorie.content = $stateParams.content;
    };

    $scope.addNewCategorie = function () {
        $scope.newCategorie.date = new Date();
        if ($state.current.name == "addCategorie") {
            $http.post("http://localhost:23456/app/categorie", $scope.newCategorie)
            .then(function(res) {
                console.log("envoyé");
                $state.go('categories');
            });
        }
        else{
            $http.put("http://localhost:23456/app/categorie", $scope.newCategorie)
            .then(function(res) {
                console.log("mis à jour");
                $state.go('categories');
            });
        }
    }
})
