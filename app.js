/**
 * Created by AVillanueva on 09-04-2015.
 * This example was made following =>
 * https://egghead.io/lessons/angularjs-using-angularjs-interceptors-with-http
 */
var interceptor = function ($q, $location) {
    return {
        request: function (config) {
            console.log(config);
            /**
             * Intercepting url configuration
             */
            //config.url = config.url.replace('villanuevand','johnpapa');
            return config;
        },

        response: function (result) {
            console.log('Usuario :',result.data.login);
            console.log('Repositorios Publicos :',result.data.public_repos);
            return result;
        },

        responseError: function (rejection) {
            console.log('Failed with', rejection.status, 'status');
            if (rejection.status == 403) {
                /**
                 * In case on Error, redirect to {any location}
                 * using $location, if you´re using ui-router redirect
                 * to using with $state.go();
                 */
                $location.url('www.google.com');
            }

            return $q.reject(rejection);
        }
    }
};

angular.module('app', [])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(interceptor);
    })
    .run(function ($http) {
        $http.get('https://api.github.com/users/villanuevand');
    });