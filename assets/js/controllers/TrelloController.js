(function ()
{
  'use strict';

  angular.module('trello-like')
         .controller('TrelloController', TrelloController);

  TrelloController.$inject = ['$scope','BoardsApi', 'boardsResolve'];

  function TrelloController($scope, BoardsApi, boardsResolve)
  {
    var vm          = this;
    vm.boards       = boardsResolve;
    vm.updateBoards = updateBoards;
    vm.addBoard     = addBoard;

    function updateBoards(event, args)
    {
      vm.boards.splice(args.idx, 1);
    }

    function addBoard()
    {
      var newboard   = new BoardsApi;
      newboard.name  = 'Default name';
      newboard.cards = [];
      newboard.$save();
      vm.boards.push(newboard);
    }

    $scope.$on('modelDeleted', vm.updateBoards);//on board deletion
  }
})();
