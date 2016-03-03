(function ()
{
  'use strict';

  angular.module("trello-like")
         .config(function ($stateProvider, $urlRouterProvider, UserAccessLevels)
                 {
                   $stateProvider
                     .state('guest',
                            {
                              abstract: true,
                              template: '<ui-view />',
                              data    : {
                                access: UserAccessLevels.guest
                              }
                            })
                     .state('guest.login',
                            {
                              url        : '/login',
                              templateUrl: 'auth/login.html',
                              controller : 'LoginController as loginctl'
                            }
                     )
                     .state('guest.register',
                            {
                              url        : '/register',
                              templateUrl: 'auth/register.html',
                              controller : 'RegisterController as registerctl'
                            }
                     )
                     .state('user',
                            {
                              abstract: true,
                              template: '<ui-view />',
                              data    : {
                                access: UserAccessLevels.user
                              }
                            }
                     )
                     .state('user.home',
                            {
                              url        : '/',
                              templateUrl: 'home.html',
                              controller : 'TrelloController as vm',
                              resolve: {
                                boardsResolve: function (BoardsApi)
                                {
                                  return BoardsApi.query().$promise;
                                }
                              }
                            }
                     );

                   $urlRouterProvider.otherwise('/');
                 });
})();
