angular.module('MyWordPress.site.pages', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state("page", {
                 url : "/page/:page_id",
                 views : {
					 "header" : {templateUrl: "site/siteHeader/siteHeader.html"},
                     "content" : {templateUrl: "site/pages/page.html"}
                 }
             }
		);

}])

.controller("showPageCtrl", function ($scope, $http, $state, $stateParams) {
	console.log($stateParams.page_id);
	$http.get("http://localhost:23456/app/page/" + $stateParams.page_id)
	.then(function(res) {
	       $scope.page = res.data;
    });

})
