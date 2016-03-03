(function ()
{
  'use strict';

  angular.module('trello-like')
         .filter('escapeHTML', escapeHTML);

  function escapeHTML()
  {
    return function (input)
    {
      if (input)
      {
        return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
      }
      return '';
    };
  }
})();
