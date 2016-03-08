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
		)
		.state("article", {
                 url : "/article/comments/:article_id",
                 views : {
					 "header" : {templateUrl: "site/siteHeader/siteHeader.html"},
                     "content" : {templateUrl: "site/articles/article_comments.html"}
                 }
             }
		);

}])



.controller("showArticlesCtrl", function ($scope, $http, $state, $stateParams, AuthenticationService, $location, $window) {
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
			if ($state.current.name == "categorie_aricles")
				$state.go('categorie_aricles', { categorie_id : $stateParams.categorie_id }, {reload : true});
			else
				$state.go('article', { article_id : $stateParams.article_id }, {reload : true});
		});
	}

	if ($state.current.name == "categorie_aricles") {
		$http.get("http://localhost:23456/app/categorie_articles/" + $stateParams.categorie_id)
		.then(function(res) {
			   $scope.articles = res.data;
		});
	}
	else {
		$scope.article = {};
		$http.get("http://localhost:23456/app/article/" + $stateParams.article_id)
		.then(function(res) {
			   $scope.one_article = res.data;
			   $http.get("http://localhost:23456/app/article/commentaires/" + $scope.one_article._id)
				  .then(function(res) {
					  $scope.article_comments = res.data;
				  });
		});
	}
})

.controller("siteArticleController", function ($scope, $http, $state, $stateParams, AuthenticationService) {
	$http.get("http://localhost:23456/app/article/commentaires/" + $scope.article._id)
    .then(function(res) {
        $scope.comments = res.data;
    });

})
