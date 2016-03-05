angular.module('MyWordPress.site.connection', ['ui.router', 'ngRoute']);


app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("login", {
                    url : "/login",
                    views : {
                        "content" : {templateUrl: "site/connection/connection.html"}
                    }
                }
            )
        }
    ]
)

app.controller("loginCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {
    $scope.connection_data = {};
    $scope.user_connection = function () {
        $http.post("http://localhost:23456/app/login", $scope.connection_data)
        .then(function(res) {
            if (res.status == 200) {
                AuthenticationService.isLogged = true;
				AuthenticationService.user_id = res.data.user_id;
				AuthenticationService.droit = res.data.droit;
                $window.sessionStorage.token = res.data.token;

				if (AuthenticationService.droit == 1) {
					$state.go('dashboard');
				}
				else {
					$state.go('site');
				}

            }
        });
    }
});
