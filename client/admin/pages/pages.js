angular.module('MyWordPress.admin.pages', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("pages", {
                url : "/pages",
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/pages/pages.html"}
                }
            }
        )
        .state("addPage", {
                url : "/addPage",
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/pages/newPage.html"}
                }
            }
        )
        .state("editPage", {
                url : "/editPage",
                params : {"id" : undefined, "title" : undefined, "content" : undefined, "date" : undefined},
                views : {
                    "header" : {templateUrl: "admin/template/header.html"},
                    "content" : {templateUrl: "admin/pages/newPage.html"}
                }
            }
        );

}])

.controller("pagesCtrl", function ($scope, $http, $location, $state) {
	$http.get("http://localhost:23456/app/pages/")
    .then(function(res) {
    	$scope.pages = res.data;
    });

    $scope.deletePage = function function_name (id) {
    	$http.delete("http://localhost:23456/app/page/" + id)
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
})

.controller("newPage", function ($scope, $http, $state, $stateParams, AuthenticationService) {
    $scope.newPage = {};
    if ($state.current.name == "editPage") {
        $scope.newPage.id = $stateParams.id;
        $scope.newPage.title = $stateParams.title;
        $scope.newPage.content = $stateParams.content;
    };

    $scope.addNewPage = function () {
        $scope.newPage.date = new Date();
		$scope.newPage.user = AuthenticationService.user_id;
        if ($state.current.name == "addPage") {
            $http.post("http://localhost:23456/app/page", $scope.newPage)
            .then(function(res) {
                console.log("envoyé");
                $state.go('pages');
            });
        }
        else{
            $http.put("http://localhost:23456/app/page", $scope.newPage)
            .then(function(res) {
                console.log("mis à jour");
                $state.go('pages');
            });
        }
    }
})
