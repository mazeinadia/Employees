app.controller('listController', function ($compile, $scope) {
    $scope.departments = [
        {
            text: 'департемент'
        }
    ];
    $scope.employees = [
        {
            text: 'рабочий',
            department: 2
        },
        {
            text: 'рабочий2',
            department: 1
        },
        {
            text: 'рабочий1',
            department: 1
        }
    ];
    $scope.positions = [
        {
            text: 'позиция'
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

    $scope.getCard = function() {
        console.log($scope.data.changingNeeded);
        if ($scope.data.changingNeeded!== undefined) {
            return '<card-directive></card-directive>'
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

    $scope.changingNeeded = function (key) {
        if ($scope.data.checked === key) {
            let mode = $scope.data.mode;
            let card = angular.element('<card-directive mode="' + mode + '" data="' + key + '"></card-directive>');
            let content = angular.element(document.querySelector('.content'));
            content.append(card);
            $compile(card)($scope);
        }
    }
});