app.controller('divisionsListController', function($compile, $scope) {
    $scope.departments = [
        {
            text: 'департемент'
        }
    ];
    $scope.employees = [
        {
            text: 'рабочий'
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

    $scope.getSearch = function () {
        if ($scope.data.mode !== undefined){
            return 'src/search/search.html'
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

    $scope.changingNeeded = function () {
        console.log('try to add');
        let mode = $scope.data.mode;
        console.log(mode);
        let card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        console.log(card);
        let content = angular.element(document.querySelector('.content'));
        console.log(content);
        content.append(card);
        $compile(card)($scope);
    }
});