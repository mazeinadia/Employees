app.directive('card', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            entity: '=',
            data: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                log(newMode)
            });
            let card;
            switch (scope.mode) {
                case 'employee':
                    if (scope.data) {
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({name: ''});
                        scope.positions = scope.data.positions;
                        if (scope.entity) {
                            scope.entity = JSON.parse(scope.entity);
                        }
                        card = angular.element('<employee-card id="card" ' +
                            'data="entity" departments="departments" positions="positions">');
                    } else {
                        card = angular.element('<employee-card id="card">');
                    }
                    break;
                case 'department':
                    if (scope.data) {
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({name: ''});
                        /*if (scope.entity) {
                            scope.entity = JSON.parse(scope.entity);
                        }*/
                        card = angular.element('<department-card id="card" data="entity" departments="departments">');
                    } else {
                        card = angular.element('<department-card id="card">');
                    }
                    break;
                case 'position':
                    if (scope.entity) {
                        scope.entity = JSON.parse(scope.entity);
                    }
                    card = angular.element('<position-card id="card" data="entity">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    }
});