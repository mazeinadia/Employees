app.directive('card', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            entity: '=',//'@',
            data: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                let card;
                switch (scope.mode) {
                    case 'employee':
                        if (scope.data) {
                            scope.data = JSON.parse(scope.data);
                            scope.departments = scope.data.departments;
                            scope.departments.push({name: ''});
                            scope.positions = scope.data.positions;
                            if (scope.entity) {
                                scope.employee = JSON.parse(scope.entity)
                            }
                            card = angular.element('<employee-card id="card" mode="mode"' +
                                'data="employee" departments="departments" positions="positions">');
                        } else {
                            card = angular.element('<employee-card id="card">')
                        }
                        break;
                    case 'department':
                        if (scope.data) {
                            scope.data = JSON.parse(scope.data);
                            scope.departments = scope.data.departments;
                            scope.departments.push({name: ''});
                            scope.department = angular.copy(scope.entity);
                            card = angular.element('<department-card id="card" data="department" departments="departments">');
                        } else {
                            card = angular.element('<department-card id="card">')
                        }
                        break;
                    case 'position':
                        if (scope.entity) {
                            scope.position = JSON.parse(scope.entity)
                        }
                        card = angular.element('<position-card id="card" data="position">')
                }
                element.replaceWith(card);
                $compile(card)(scope)
            });
        }
    }
});