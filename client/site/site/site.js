angular.module('MyWordPress.site', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state("site", {
                url : "/",
        				views : {
        					"content" : {templateUrl: "site/site/site.html"},
							"header" : {templateUrl: "site/siteHeader/siteHeader.html"},
        				}
        			}
        		);

}])

.controller("siteCtrl", function ($scope, $http, $location, $state) {

});
