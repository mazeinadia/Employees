var employeeApp = angular.module('employeeApp', []);

const EMPLOYEE_FIELDS = [
    'ФИО сотрудника',
    'Дата приема на работу',
    'Должность',
    'Отдел',
    'Номер телефона',
    'E-mail'
];

employeeApp.controller('employeeController', function ($scope) {
    $scope.fielsLabels = EMPLOYEE_FIELDS;
});