app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        link: function (scope) {
            if(!scope.data.addition) {
                scope.emp = JSON.parse(scope.data.checked);
            }
            $('#phone').mask('+7(999)999-9999');
            scope.data.addition = false;
        },
        templateUrl: 'src/employee/employeeCard.html'
    }
});