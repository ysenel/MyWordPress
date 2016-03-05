angular.module('MyWordPress.site.registre', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state("newAdminUser", {
					url : "/newAdminUser",
					views : {
						"content" : {templateUrl: "site/registration/newUser.html"}
					}
				}
			)
        .state("newUser", {
                    url : "/newUser",
                    views : {
                        "content" : {templateUrl: "site/registration/newUser.html"}
                    }
                }
            );

}])

.controller("newUserCtrl", function ($scope, $http, $location, $state) {
    $scope.user_data = {};
	if ($state.current.name == "newAdminUser")
		$scope.user_data.droit = 1;
	else
		$scope.user_data.droit = 2;
		
    $scope.new_user = function () {
        $http.post("http://localhost:23456/app/user", $scope.user_data)
        .then(function(res) {
            if (res.status == 200) {
                $state.go('site');
            }
        });
    }
});
