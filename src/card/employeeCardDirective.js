app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs, modelCtrl) {
            console.log('work');
            console.log(scope.data.checked.name);
            scope.emp = JSON.parse(scope.data.checked);
            console.log(scope.emp.department.name);
        },
        templateUrl: 'src/employee/employeeCard.html'
        }
});