(function ()
{
  'use strict';

  angular.module('trello-like')
       .constant('UserAccessLevels', {
         guest: 0,
         user : 1
       });
})();
