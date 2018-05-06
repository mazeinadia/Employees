var employeeApp = angular.module('employeeApp', []);

const EMPLOYEE_FIELDS = [
    'ФИО сотрудника',
    'Дата приема на работу',
    'Должность',
    'Отдел',
    'Номер телефона',
    'E-mail'
];

var employeesList = [
    {
        name: 'Иванов Иван Иванович',
        position: 'Менеджер'
    },
    {
        name: 'Пертров Иван Иванович',
        position: 'Главный директор'
    }
];

employeeApp.controller('employeeController', function ($scope) {
    $scope.data = {};
    $scope.addEmployee = function () {
        $scope.data.mode = 'addEmployee'
    };

    $scope.employee = {};
    $scope.employeesList = employeesList;

    $scope.setCard = function () {
        if($scope.data.mode === 'addEmployee'){
            return '/employee/employeeCard.html'
        }
    }
});