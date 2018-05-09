app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs, modelCtrl) {
            scope.emp = JSON.parse(scope.data.checked);
            $('#phone').mask('+7(999)999-9999');
        },
        templateUrl: 'src/employee/employeeCard.html'
    }
});