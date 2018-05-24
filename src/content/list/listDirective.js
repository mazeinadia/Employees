app.directive('chooseList', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            data: '@',
            search: '<'
        },
        link: function (scope, element, attrs) {
            let list;
            if (scope.data) {
                scope.data = JSON.parse(scope.data);

                switch (scope.mode) {
                    case 'employee':
                        scope.employees = scope.data.employees;
                        list = angular.element(
                            '<employee-list data="employees" search="search">'
                        );
                        break;
                    case 'department':
                        scope.departments = scope.data.departments;
                        list = angular.element(
                            '<department-list data="departments" search="search">'
                        );
                        break;
                    case 'position':
                        scope.positions = scope.data.positions;
                        list = angular.element(
                            '<position-list data="positions" search="search">'
                        );
                }

                element.replaceWith(list);
                $compile(list)(scope);
            }
        }
    }
});