app.directive('tree', function () {
   return {
       restrict: 'E',
       scope: {
           collection: '='
       },
       template: '<ul><node ng-repeat="member in collection | filter: data.search.name | orderBy: '+'\''+'name'+'\''+'" member="member"></node></ul>'
   }
});