(function ()
{
  'use strict';

  angular.module('trello-like')
         .directive('board', BoardDirective);

  function BoardDirective()
  {
    var directive = {
      restrict    : 'E',
      scope       : {
        model: '=tlModel',
        idx  : '=tlIndex' //for delete event
      },
      controllerAs: 'bvm',
      controller  : BoardController,
      templateUrl : 'directives/board.html'
    };

    return directive;

    function BoardController($scope, $rootScope)
    {
      var bvm = this;

      bvm.sortableOptions = {
        connectWith: '.listCards',
        placeholder: 'listCard',
        dropOnEmpty: true,
        stop       : bvm.saveBoard, //save on reorder and remove
        receive    : bvm.saveBoard //save on receive
      };
      bvm.removeBoard     = removeBoard;
      bvm.saveBoard       = saveBoard;

      bvm.addCard    = addCard;
      bvm.removeCard = removeCard;

      $scope.$on('modelChanged', bvm.saveBoard);//for in-place editing of card text and board name

      function saveBoard()
      {
        $scope.model.$update();
      }

      function removeBoard()
      {
        $scope.model.$delete().then(function (res)
                                    {
                                      $rootScope.$broadcast('modelDeleted', {idx: $scope.idx});//hack :(
                                    });
      }

      function addCard()
      {
        $scope.model.cards.push({content: 'Default text for new card'});
        bvm.saveBoard();
      }

      function removeCard(idx)
      {
        $scope.model.cards.splice(idx, 1);
        bvm.saveBoard();
      }
    }
  }
})();
