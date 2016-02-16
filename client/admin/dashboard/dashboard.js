angular.module('MyWordPress.admin.dashboard', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
        .state("dashboard", {
                url : "/dashboard",
                views : {
                  "header" : {templateUrl: "admin/template/header.html"},
                  "content" : {templateUrl: "admin/dashboard/dashboard.html"}
                }
              }
            );

}])
