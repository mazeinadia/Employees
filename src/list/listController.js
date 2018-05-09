app.controller('listController', function ($compile, $scope) {
    $scope.departments = [
        {
            name: 3,
            parent: 'вышестоящий'
        },
        {
            name: 2,
            parent: 'вышестоящий'
        },
        {
            name: 1,
            parent: 'вышестоящий'
        }
    ];
    $scope.positions = [
        {
            name: 3,
            parent: 'вышестоящий'
        },
        {
            name: 2,
            parent: 'вышестоящий'
        },
        {
            name: 1,
            parent: 'вышестоящий'
        }
    ];
    $scope.employees = [
        {
            name: 'рабочий',
            date:  '2018-03-01',
            position: $scope.positions[1],
            department: $scope.departments[1],
            phone: '123456789',
            email: 'mail@mail.ru'
        },
        {
            name: 'рабочий2',
            date:  '2018-03-01',
            position: $scope.positions[0],
            department:  $scope.departments[0],
            phone: '323456789',
            email: 'mail3@mail.ru'
        },
        {
            name: 'рабочий1',
            date:  '2018-03-01',
            position: $scope.positions[2],
            department:  $scope.departments[2],
            phone: '223456789',
            email: 'mail2@mail.ru'
        }
    ];



    $scope.data = {};

    $scope.modes = [
        {
            value: 'employee',
            text: 'Сотрудники'
        },
        {
            value: 'department',
            text: 'Отделы'
        },
        {
            value: 'position',
            text: 'Должности'
        }
    ];

    $scope.search = {};
    $scope.selected = $scope.departments[0];

    $scope.printData = function() {
        console.log($scope.search)
    };

    $scope.getSearch = function () {
        if ($scope.data.mode !== undefined){
            return 'src/search/search.html'
        }

    };

    $scope.getContent = function() {
        switch ($scope.data.mode) {
            case 'employee':
                return 'src/employee/employeesList.html';
            case 'department':
                return 'src/department/departmentsList.html';
            case 'position':
                return 'src/position/positionsList.html';
        }
    };

    $scope.additionNeeded = function () {
        console.log('try to add');
        let mode = $scope.data.mode;
        console.log(mode);
        let card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        console.log(card);
        let content = angular.element(document.querySelector('.content'));
        console.log(content);
        content.append(card);
        $compile(card)($scope);
    };

    $scope.data = {};
    $scope.changingNeeded = function (employee) {
        let mode = $scope.data.mode;
        console.log(employee);
        let card = angular.element('<employee-card-directive>');
        let content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)($scope);
    }
});