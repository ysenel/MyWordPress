angular.module('MyWordPress.site.registre', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("newUser", {
                    url : "/newUser",
                    views : {
                        "content" : {templateUrl: "site/registre/newUser.html"}
                    }
                }
            );

}])

.controller("newUserCtrl", function ($scope, $http, $location, $state) {
    $scope.user_data = {};
    $scope.new_user = function () {
        $http.post("http://localhost:23456/app/user", $scope.user_data)
        .then(function(res) {
            if (res.status == 200) {
                $state.go('site');
            }
        });
    }
});
