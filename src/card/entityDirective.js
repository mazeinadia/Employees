app.directive('entity', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            entity: '=' //'@'
        },
        link: function () {
            scope.$watch('mode', function (newMode) {
                log(newMode)
            });
            let card;
            log('in card link');
            switch (scope.mode) {
                case 'employee':
                    card = angular.element('<employee-card id="card" data="entity">');
                    break;
                case 'department':
                    card = angular.element('<department-card id="card" data="entity">');
                    break;
                case 'position':
                    card = angular.element('<position-card id="card" data="entity">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    }
});