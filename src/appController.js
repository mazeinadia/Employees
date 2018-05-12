app.controller('appController', function ($scope) {
    $scope.data = {};
    $scope.data.departments = [];
    $scope.data.positions = [];
    $scope.data.employees = [];
    $scope.search = {};
    $scope.root = {};
    $scope.data.cardNeeded = false;

    $scope.data.modes = [
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
            return 'src/list/search/search.html'
        }
    };

    $scope.getList = function() {
        switch ($scope.data.mode) {
            case 'employee':
                return 'src/employee/employeesList.html';
            case 'department':
                return 'src/department/departmentsList.html';
            case 'position':
                return 'src/position/positionsList.html';
        }
    };

    $scope.getCard = function () {
        if ($scope.data.cardNeeded) {
            switch ($scope.data.mode) {
                case 'employee':
                    return 'src/employee/employeeCard.html';
                case 'department':
                    return 'src/department/departmentCard.html';
                case 'position':
                    return 'src/position/positionCard.html';
            }
            $scope.data.cardNeeded = false
        }
    };


    //$scope.selected = $scope.departments[0];
    /*$scope.printData = function() {
        console.log($scope.search)
    };*/

    /*$scope.setTestData = function () {
        storage.setTestData();
        $scope.modes.forEach((mode) => {
            $scope[mode.value+'s'] = storage.getAllEntitiesOneType(mode.value);
        });
        alert('БД заполнена тестовыми данными')
    };

    $scope.clearDB = function () {
        storage.clear();
        alert('БД очищена')
    };*/

    /*function deleteOldCard() {
        let content = angular.element(document.querySelector('.content'));
        let oldCard = content.find('card-directive');
        oldCard.remove();
        oldCard = content.find('employee-card-directive');
        oldCard.remove();
    }

    $scope.additionNeeded = function () {
        deleteOldCard();
        $scope.data.addition = true;
        let mode = $scope.data.mode;
        let card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        let content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)($scope);
    };


    $scope.changingNeeded = function () {
        deleteOldCard();
        log($scope.data.checked);
        let card = angular.element('<employee-card-directive>');
        let content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)($scope);
    };*/

    /*function addChildNodes(parent, parentElem) {
        $scope.departments.forEach((department) => {
            if (department.parent === parent.name)
            {
                let node = angular.element('<department-node>');
                parentElem.append(node);
                addChildNodes(department, node);
            }
        })
    }

    $scope.department.addRootNode = function () {
        let list = angular.element(document.querySelector('.departments'));
        addChildNodes(undefined, list);
    }*/
});