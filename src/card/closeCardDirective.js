app.directive('closeCard', function($compile) {
    return {
        restrict: 'A',
        scope: {
            closeCard: '@'
        },
        link: function (scope, elment, attributes) {
            scope.$watch('closeCard', function (value) {
                if(value === 'true') {
                    let content = angular.element(document.getElementById('card'));
                    let card = angular.element('<div id="card"></div>');
                    content.replaceWith(card);
                    $compile(card)(scope)
                }
            })
        }
    }
});