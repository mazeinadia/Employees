var app = angular.module("app", []);

var divisionsList = [
    "Сотрудники",
    "Отделы",
    "Должности"
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

var positionsList = [
    {
        name: 'Менеджер',
        salary: 1000
    },
    {
        name: 'Главный директор',
        salary: 10000
    },
];

var departmentsList = [
    {
        name: 'Рекламма',
        parent: 'Связь с общественностью'
    },
    {
        name: 'Разработки'
    }
]

app.controller("controller", function ($scope) {
    $scope.divisionsList = divisionsList;
    $scope.employeesList = employeesList;
    $scope.positionsList = positionsList;
    $scope.departmentsList = departmentsList;

    $scope.data = {};
    $scope.modes = [
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
})