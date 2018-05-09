app.directive('cardDirective', function () {
    return {
        restrict: 'E',
        template:  '<employee-card-directive></employee-card-directive>'
        /*
        name: 'рабочий',
            date:  '2018-03-01',
            position: 'pos',
            department: 2,
            phone: '123456789',
            email
        templateUrl: function (elem, attrs) {
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