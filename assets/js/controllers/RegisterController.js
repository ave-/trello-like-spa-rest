(function ()
{
  'use strict';

  angular.module('trello-like')
         .controller('RegisterController', RegisterController);

  function RegisterController($state, Auth)
  {
    var vm      = this;
    vm.errors   = [];
    vm.user     = {login: '', password: '', confirmPassword: ''};
    vm.register = register;

    function register()
    {
      Auth.register(vm.user)
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
