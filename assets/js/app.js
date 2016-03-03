(function ()
{
  'use strict';

  angular.module("trello-like", [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap',
    'ui.router',
    'ui.sortable'
  ]).run(function ($rootScope, $state, Auth)
         {
           $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams)
           {
             if (!Auth.authorize(toState.data.access))
             {
               event.preventDefault();

               $state.go('guest.login');
             }
           });
         }
  );
})();
