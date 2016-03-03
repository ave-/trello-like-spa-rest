(function ()
{
  'use strict';

  angular.module('trello-like')
         .factory('Auth', Auth)
         .factory('AuthInterceptor', AuthInterceptor)
         .config(function ($httpProvider)
                 {
                   $httpProvider.interceptors.push('AuthInterceptor');
                 });

  function Auth($http, LocalStorageService, UserAccessLevels)
  {
    return {
      authorize   : authorize,
      isAuthorized: isAuthorized,
      login       : login,
      logout      : logout,
      register    : register,
      user        : user
    };

    function authorize(access)
    {
      if (access === UserAccessLevels.user)
      {
        return this.isAuthorized();
      }
      else
      {
        return true;
      }
    }

    function isAuthorized()
    {
      return LocalStorageService.get('auth_token');
    }

    function login(credentials)
    {
      var login = $http.post('/auth', credentials);
      login.success(function (result)
                    {
                      LocalStorageService.set('auth_token', JSON.stringify(result));
                    });
      return login;
    }

    function logout()
    {
      // just delete the token, no need to logout on backend
      LocalStorageService.unset('auth_token');
    }

    function register(formData)
    {
      LocalStorageService.unset('auth_token');
      var register = $http.post('/auth/register', formData);
      register.success(function (result)
                       {
                         LocalStorageService.set('auth_token', JSON.stringify(result));
                       });
      return register;
    }

    function user()
    {
      var login = '';
      if (LocalStorageService.get('auth_token'))
      {
        login = angular.fromJson(LocalStorageService.get('auth_token')).login;
      }
      return login;
    }
  }

  function AuthInterceptor($q, $injector)
  {
    var LocalStorageService = $injector.get('LocalStorageService');

    return {
      request      : function (config)
      {
        var token;
        if (LocalStorageService.get('auth_token'))
        {
          token = angular.fromJson(LocalStorageService.get('auth_token')).token;
        }
        if (token)
        {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function (response)
      {
        if (response.status === 401 || response.status === 403)
        {
          LocalStorageService.unset('auth_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    }
  }
})();
