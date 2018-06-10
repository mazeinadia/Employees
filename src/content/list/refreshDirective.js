app.directive('refreshList', function () {
    return {
        restrict: 'A',
        scope: {
            refreshList: '@'
        },
        link: function (scope, element, attributes) {
            scope.$watch('refreshList', function () {
                if (scope.refreshList === 'true') {

                }
            })
        }
    }
});