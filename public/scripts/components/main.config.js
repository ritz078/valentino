/*global Chart*/

'use strict';


var resolve = {
  delay: function ($q, $timeout) {
    var delay = $q.defer();
    $timeout(delay.resolve, 50, false);
    return delay.promise;
  }
};

var app = angular.module('valentinoApp');

app.config(['$routeProvider',
  function ($routeProvider) {
    $routeProvider
      .when('/rules', {
        templateUrl: '/views/rules.html',
        controller: 'RulesController',
        resolve: resolve
      })
      .when('/shout/:id', {
        templateUrl: '/views/shout.html',
        controller: 'ShoutController',
        resolve: resolve
      })
      .when('/user/:enrolmentNo', {
        templateUrl: '/views/user.html',
        controller: 'UserController',
        resolve: resolve
      });


  }]);

Chart.defaults.global.scaleLineColor='rgba(255,255,255,.1)';
Chart.defaults.global.scaleFontColor='rgba(255,255,255,0.8)';
Chart.defaults.global.scaleFontFamily='Lato,sans-serif';
Chart.defaults.global.animationSteps=150;

