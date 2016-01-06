var app = angular.module('MyWordPress', ['ui.router']);

app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state("header", {views : {templateUrl: "template/header.html"}});
}]);