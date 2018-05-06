app.directive('cardDirective', function () {
    return {
        restrict: 'E',
        template: function (elem, attrs){
            return '<employee-card-directive text ="'+attrs.data+'" ></employee-card-directive>'
        }
        /*templateUrl: function (elem, attrs) {
            console.log('in link');
            console.log(attrs.mode);
            switch (attrs.mode) {
                case 'employee':
                    return 'src/employee/employeeCard.html';
                case 'department':
                    return 'src/department/departmentCard.html';
                    break;
                case 'position':
                    return 'src/position/positionCard.html';
            }
        }*/
    }
});