var app = angular.module('MyWordPress', ['ui.router']);

app.config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.state("header", {
				views : {
					"header" : {templateUrl: "template/header.html"}
				}
			}
		);
}])

.run(['$state', function ($state) {
   $state.transitionTo('header');
}]);
