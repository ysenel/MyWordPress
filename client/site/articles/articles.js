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



.controller("showArticlesCtrl", function ($scope, $http, $state, $stateParams, AuthenticationService) {
	$scope.comment = false;
	$scope.new_comment = {};

	$scope.show_comment_form = function (context) {
		context.comment = true;
	}

	$scope.cancel = function (context) {
		console.log(context);
		context.comment = false;
	}

	$scope.add_comment = function (article_id) {
		if (AuthenticationService.isLogged) {
			$scope.new_comment.user = AuthenticationService.user_id;
			$scope.new_comment.anonymous = false;
		}
		else
			$scope.new_comment.anonymous = true;

		$scope.new_comment.article = article_id;
		$scope.new_comment.date = new Date();

		$http.post("http://localhost:23456/app/commentaire", $scope.new_comment)
		.then(function(res) {
			$state.go('site');
		});
	}

	$http.get("http://localhost:23456/app/categorie_articles/" + $stateParams.categorie_id)
	.then(function(res) {
	       $scope.articles = res.data;
    });

})

.controller("siteArticleController", function ($scope, $http, $state, $stateParams, AuthenticationService) {
	$http.get("http://localhost:23456/app/article/commentaires/" + $scope.article._id)
    .then(function(res) {
        $scope.comments = res.data;
    });

})
