angular.module('MyWordPress.site.articles', ['ui.router', 'ngRoute'])
.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
		.state("categorie_aricles", {
                 url : "/categorie_articles/:categorie_id",
                 views : {
					 "header" : {templateUrl: "site/siteHeader/siteHeader.html"},
                     "content" : {templateUrl: "site/articles/articles.html"}
                 }
             }
		);

}])

.controller("showArticlesCtrl", function ($scope, $http, $state, $stateParams) {
	$http.get("http://localhost:23456/app/categorie_articles/" + $stateParams.categorie_id)
	.then(function(res) {
	       $scope.articles = res.data;
    });

})
