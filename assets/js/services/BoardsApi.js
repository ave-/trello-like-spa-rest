(function ()
{
  'use strict';

  angular.module('trello-like')
         .factory('BoardsApi', BoardsApi);

  function BoardsApi($resource)
  {
    return $resource('board/:id', {id: '@id'},
                     {
                       update: {
                         method: 'PUT'
                       }
                     }
    );
  }
})();
