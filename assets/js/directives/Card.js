(function ()
{
  'use strict';

  angular.module('trello-like')
         .directive('card', CardDirective);

  function CardDirective()
  {
    return {
      restrict   : 'E',
      scope      : {
        model: '=tlModel'
      },
      templateUrl: 'directives/card.html'
    };
  }
})();
