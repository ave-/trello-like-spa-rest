(function ()
{
  'use strict';

  angular.module('trello-like')
         .controller('NavController', NavController);

  NavController.$inject = ['$state' ,'Auth'];

  function NavController($state, Auth)
  {
    var vm         = this;
    vm.isCollapsed = true;
    vm.auth        = Auth;

    vm.logout = logout;
    function logout()
    {
      Auth.logout();
      $state.go('guest.login');
    }
  }
})();
