angular.module('MyWordPress.site.profil', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("siteEditProfil", {
                    url : "/site/editProfil",
                    views : {
                        "content" : {templateUrl: "site/profil/updateProfil.html"}
                    }
                }
            );

}])

.controller("siteUpdateUserCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {
    $scope.user_data = {};

    $http.get("http://localhost:23456/app/user/" + AuthenticationService.user_id)
    .then(function(res) {
        $scope.user_data.login = res.data.login;
        $scope.user_data.last_name = res.data.last_name;
        $scope.user_data.first_name = res.data.first_name;
        $scope.user_data.pass = res.data.pass;
        $scope.user_data.token = res.data.token;
        $scope.user_data.id = res.data._id;
    });

    $scope.update_user = function () {
        $http.put("http://localhost:23456/app/user", $scope.user_data)
        .then(function(res) {
            console.log("mis à jour");
            $state.go('site');
        });
    };
});
