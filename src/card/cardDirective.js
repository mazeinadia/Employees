app.directive('card', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            data: '@'
        },
        link: function(scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                log(newMode)
            });
            let card, data;
            switch (scope.mode) {
                case 'employee':
                    if (scope.data) {
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({name: ''});
                        scope.positions = scope.data.positions;
                        card = angular.element('<employee-card positions="positions" departments="departments">');
                    } else {
                        card = angular.element('<employee-card id="card">');
                    }
                    break;
                case 'department':
                    if (scope.data) {
                        data = JSON.parse(scope.data);
                        scope.departments = data.departments;
                        scope.departments.push({name: ''});
                        card = angular.element('<department-card id="card" departments="departments">');
                    } else {
                        card = angular.element('<department-card id="card">');
                    }
                    break;
                case 'position':
                    card = angular.element('<position-card id="card">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    }
});