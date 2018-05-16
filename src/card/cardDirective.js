app.directive('cardManipulation', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mode: '=',
            entity: '='
        },
        template: '<div class="card"></div>',
        link: function (scope, element, attrs) {
            switch (scope.mode) {
                case 'employee':
                    element.append('<employee-card data="entity">');
                    break;
                case 'department':
                    element.append('<department-card data="entity">');
                    break;
                case 'position':
                    element.append('<position-card data="entity">');
            }
            $compile(element.contents())(scope);
        }
    }
})