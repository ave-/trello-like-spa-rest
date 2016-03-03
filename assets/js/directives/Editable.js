(function ()
{
  'use strict';

  angular.module('trello-like')
         .directive('editable', EditableDirective);

  function EditableDirective()
  {
    var directive = {
      restrict    : 'E',
      scope       : {
        model: '=tlModel',
        type : '@tlType'
      },
      controllerAs: 'evm',
      controller  : EditableController,
      templateUrl : 'directives/editable.html'
    };
    return directive;

    function EditableController($scope)
    {
      var vm      = this;
      vm.editing  = false;
      vm.prevData = $scope.model;
      vm.save     = save;
      vm.undo     = undo;
      vm.edit     = edit;

      function save()
      {
        vm.editing = false;
        $scope.$emit('modelChanged');
      }

      function undo()
      {
        $scope.model = this.prevData;
        vm.editing   = false;
      }

      function edit()
      {
        vm.prevData = $scope.model;
        vm.editing  = true;
      }
    }
  }
})();
