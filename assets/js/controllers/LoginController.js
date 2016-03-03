(function ()
{
  'use strict';

  angular.module('trello-like')
         .controller('LoginController', LoginController);

  LoginController.$inject = ['$state', 'Auth'];

  function LoginController($state, Auth)
  {
    var vm    = this;
    vm.errors = [];
    vm.user   = {login: '', password: ''};
    vm.login  = login;

    function login()
    {
      vm.errors = [];
      Auth.login(vm.user)
          .success(function (result)
                   {
                     $state.go('user.home');
                   })
          .error(function (err)
                 {
                   vm.errors.push(err);
                 });
    }
  }
})();
