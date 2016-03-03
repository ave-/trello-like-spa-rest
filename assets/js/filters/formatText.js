(function ()
{
  'use strict';

  angular.module('trello-like')
         .filter('formatText', formatText);

  function formatText(escapeHTMLFilter)
  {
    return function (input)
    {
      if (!input)
      {
        return input;
      }
      return escapeHTMLFilter(input)
      //replace possible line breaks.
        .replace(/(\r\n|\r|\n)/g, '<br/>')
        //replace tabs
        .replace(/\t/g, '&nbsp;&nbsp;&nbsp;')
        //replace spaces.
        .replace(/ /g, '&nbsp;');
    };
  }
})();
