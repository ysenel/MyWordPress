var app = angular.module('MyWordPress', [
    'ui.router',
    'ngRoute',

    /* SITE */
    'MyWordPress.site',
    'MyWordPress.site.registre',
    'MyWordPress.site.connection',
    'MyWordPress.site.pages',
    'MyWordPress.site.articles',

    /* ADMIN */
    'MyWordPress.admin.dashboard',
    'MyWordPress.admin.articles',
    'MyWordPress.admin.pages',
    'MyWordPress.admin.profil',
    "MyWordPress.admin.categories"
]);

app.config(function ($routeProvider) {
    $routeProvider.otherwise({redirectTo : "/"});
});

app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
}]);



app.run(['$state', function ($state) {
   $state.transitionTo('site');
}]);

app.factory('AuthenticationService', function() {
    var auth = {
        isLogged: false,
        user_id: false
    }

    return auth;
});

app.factory('TokenInterceptor', function ($window, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        }
}});


app.controller("headerCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {
    $scope.deconnexion = function () {
        AuthenticationService.isLogged = false;
        delete $window.sessionStorage.token;
        $state.go('site');
    };
});

app.controller("siteHeaderCtrl", function ($scope, $http, $location, $state, $window, AuthenticationService) {
    $scope.logged = AuthenticationService.isLogged;
    $http.get("http://localhost:23456/app/pages")
    .then(function(res) {
        $scope.pages = res.data;
    });

    $http.get("http://localhost:23456/app/categories")
    .then(function(res) {
        $scope.categories = res.data;
    });

    $scope.deconnexion = function () {
        AuthenticationService.isLogged = false;
        delete $window.sessionStorage.token;
        $state.go($state.current, {}, {reload: true});
    };
});
