"use strict";

var app = angular.module("app", []);

var log = console.log;
'use strict';

app.controller('appController', function ($scope) {
    $scope.data = {};
    $scope.data.departments = [];
    $scope.data.positions = [];
    $scope.data.employees = [];
    $scope.search = {};
    $scope.root = {};
    $scope.data.cardNeeded = false;

    $scope.data.modes = [{
        value: 'employee',
        text: 'Сотрудники'
    }, {
        value: 'department',
        text: 'Отделы'
    }, {
        value: 'position',
        text: 'Должности'
    }];

    $scope.getSearch = function () {
        if ($scope.data.mode !== undefined) {
            return 'src/list/search/search.html';
        }
    };

    $scope.getList = function () {
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
            $scope.data.cardNeeded = false;
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
'use strict';

app.controller('cardController', ['$scope', '$compile', function (scope, compile) {
    function deleteOldCard() {
        var content = angular.element(document.querySelector('.content'));
        var oldCard = content.find('card-directive');
        oldCard.remove();
        oldCard = content.find('employee-card-directive');
        oldCard.remove();
    }
    //DOM manipulating?
    scope.additionNeeded = function () {
        deleteOldCard();
        scope.data.addition = true;
        var mode = scope.data.mode;
        var card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        var content = angular.element(document.querySelector('.content'));
        content.append(card);
        compile(card)(scope);
    };

    scope.changingNeeded = function () {
        deleteOldCard();
        log(scope.data.checked);
        var card = angular.element('<employee-card-directive>');
        var content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)(scope);
    };

    scope.addDepartmentChild = function (parent) {};
}]);
'use strict';

app.directive('cardDirective', function () {
    return {
        restrict: 'E',
        template: '<employee-card-directive></employee-card-directive>'
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
    };
});
'use strict';

app.controller('dbController', ['$scope', 'storage', function (scope, storage) {
    scope.setTestData = function () {
        storage.setTestData();
        scope.data.modes.forEach(function (mode) {
            scope.data[mode.value + 's'] = storage.getAllEntitiesOneType(mode.value);
        });
        alert('БД заполнена тестовыми данными');
    };

    scope.clearDB = function () {
        storage.clear();
        alert('БД очищена');
    };
}]);
'use strict';

app.directive('db', function () {
    return {
        restrict: 'E',
        templateUrl: 'src/DB/dbTemplate.html'
    };
});
/*app.directive('departmentNode', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs, modelCtrl) {
            if(!scope.data.addition) {
                scope.emp = JSON.parse(scope.data.checked);
            }
            $('#phone').mask('+7(999)999-9999');
            scope.data.addition = false;
        },
        templateUrl: 'src/department/departmentNode.html'
    }
});*/
"use strict";
'use strict';

app.filter('parentFilter', function () {
    return function (department, parentShould) {
        log('dep: ' + department);
        log('parent: ' + parentShould);
        if (department.parent === parentShould) {
            return department;
        }
    };
});
'use strict';

app.directive('divisionsListDirective', function () {
    return {
        restrict: 'A',
        templateUrl: 'src/divisions/divisionsList.html'
    };
});
'use strict';

app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        link: function link(scope, elem, attrs, modelCtrl) {
            if (!scope.data.addition) {
                scope.emp = JSON.parse(scope.data.checked);
            }
            $('#phone').mask('+7(999)999-9999');
            scope.data.addition = false;
        },
        templateUrl: 'src/employee/employeeCard.html'
    };
});
'use strict';

app.filter('groupBy', function () {
            return function (list, group_by) {

                        var filtered = [];
                        var prev_item = null;
                        var group_changed = false;
                        // this is a new field which is added to each item where we append "_CHANGED"
                        // to indicate a field change in the list
                        var new_field = group_by + '_CHANGED';

                        // loop through each item in the list
                        angular.forEach(list, function (item) {

                                    group_changed = false;

                                    // if not the first item
                                    if (prev_item !== null) {

                                                // check if the group by field changed
                                                if (prev_item[group_by] !== item[group_by]) {
                                                            group_changed = true;
                                                }

                                                // otherwise we have the first item in the list which is new
                                    } else {
                                                group_changed = true;
                                    }

                                    // if the group changed, then add a new field to the item
                                    // to indicate this
                                    item[new_field] = group_changed;

                                    filtered.push(item);
                                    prev_item = item;
                        });

                        return filtered;
            };
});
'use strict';

app.factory('storage', function () {
    var factory = {};

    factory.testBrowser = function () {
        try {
            var _storage = window[type],
                x = '__storage_test__';
            _storage.setItem(x, x);
            _storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
        }
    };

    factory.setTestData = function () {
        for (var i = 0; i < EMPLOYEES.length; i++) {
            this.addEntity('employee' + EMPLOYEES[i].phone, EMPLOYEES[i]);
        }
        for (var _i = 0; _i < DEPARTMENTS.length; _i++) {
            this.addEntity('department' + DEPARTMENTS[_i].name, DEPARTMENTS[_i]);
        }
        for (var _i2 = 0; _i2 < POSITIONS.length; _i2++) {
            this.addEntity('position' + POSITIONS[_i2].name, POSITIONS[_i2]);
        }
    };

    factory.getEntity = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };

    factory.addEntity = function (key, entity) {
        localStorage.setItem(key, JSON.stringify(entity));
    };

    factory.deleteEntity = function (key) {
        localStorage.removeItem(key);
    };

    factory.clear = function () {
        localStorage.clear();
    };

    factory.getAllEntities = function () {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;

        while (i--) {
            values.push(this.getEntity(keys[i]));
        }

        return values;
    };

    factory.getAllEntitiesOneType = function (type) {
        var values = [],
            keys = Object.keys(localStorage),
            i = keys.length;
        while (i--) {
            if (keys[i].includes(type)) {
                values.push(this.getEntity(keys[i]));
            }
        }
        return values;
    };

    return factory;
});
'use strict';

var DEPARTMENTS = [{
    name: 'Отдел1'
}, {
    name: 'Отдел2'
}, {
    name: 'Отдел1.1',
    parent: 'Отдел1'
}, {
    name: 'Отдел1.2',
    parent: 'Отдел1'
}, {
    name: 'Отдел1.1.1',
    parent: 'Отдел1.1'
}];
var POSITIONS = [{
    name: 'Должность1',
    salary: 10500
}, {
    name: 'Должность2',
    salary: 200
}, {
    name: 'Должность3',
    salary: 150000
}, {
    name: 'Должность4',
    salary: 3500000
}];
var EMPLOYEES = [{
    name: 'рабочий',
    date: '2018-03-01',
    position: POSITIONS[1],
    department: DEPARTMENTS[1],
    phone: '+7(123)456-7890',
    email: 'mail@mail.ru'
}, {
    name: 'рабочий2',
    date: '2018-03-01',
    position: POSITIONS[0],
    department: DEPARTMENTS[0],
    phone: '+7(321)456-7890',
    email: 'mail3@mail.ru'
}, {
    name: 'рабочий1',
    date: '2018-03-01',
    position: POSITIONS[2],
    department: DEPARTMENTS[2],
    phone: '+7(213)456-7890',
    email: 'mail2@mail.ru'
}];