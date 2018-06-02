app.directive('entityD', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            entity: '@',
            data: '@'
        },
        link: function (scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                log('in entity directive mode: ' + newMode)
            });
            let card;
            scope.entity = JSON.parse(scope.entity);
            switch (scope.mode) {
                case 'employee':
                    if (scope.data){
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({name: ''});
                        scope.positions = scope.data.positions;

                        card = angular.element('<employee-card id="card" ' +
                            'data="entity" departments="departments" positions="positions">');
                    } else {
                        card = angular.element('<employee-card id="card" data="entity">');
                    }

                    break;
                case 'department':
                    if (scope.data) {
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({name: ''});

                        card = angular.element('<department-card id="card" data="entity" departments="departments">');
                    } else {
                        card = angular.element('<department-card id="card" data="entity">');
                    }
                    break;
                case 'position':
                    card = angular.element('<position-card id="card" data="entity">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    }
});