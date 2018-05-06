function DivisionsListController($scope, $element, $attrs) {
    var ctrl = this;

    ctrl.list = [
        {
            value: 'Employees',
            label: 'Сотрудники'
        },
        {
            value: 'Departments',
            label: 'Отделы'
        },
        {
            value: 'Positions',
            label: 'Должности'
        }
    ];

    ctrl.data = {};

    ctrl.setList = function() {
        switch (ctrl.data.mode)
        {
            case ('Employees'):
                return 'employee/employeesList.html';
            case ('Departments'):
                return 'department/departmentsList.html';
            case ('Positions'):
                return 'position/positionsList.html';
            default: return '';
        }
    };
}

angular.module('app').component('divisionsList', {
    templateUrl: 'divisions/divisionsList.html',
    controller: DivisionsListController
});