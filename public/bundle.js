"use strict";

var app = angular.module("app", []);
'use strict';

app.controller('listController', function ($compile, $scope) {
    $scope.departments = [{
        name: 3,
        parent: 'вышестоящий'
    }, {
        name: 2,
        parent: 'вышестоящий'
    }, {
        name: 1,
        parent: 'вышестоящий'
    }];
    $scope.positions = [{
        name: 3,
        parent: 'вышестоящий'
    }, {
        name: 2,
        parent: 'вышестоящий'
    }, {
        name: 1,
        parent: 'вышестоящий'
    }];
    $scope.employees = [{
        name: 'рабочий',
        date: '2018-03-01',
        position: $scope.positions[1],
        department: $scope.departments[1],
        phone: '123456789',
        email: 'mail@mail.ru'
    }, {
        name: 'рабочий2',
        date: '2018-03-01',
        position: $scope.positions[0],
        department: $scope.departments[0],
        phone: '323456789',
        email: 'mail3@mail.ru'
    }, {
        name: 'рабочий1',
        date: '2018-03-01',
        position: $scope.positions[2],
        department: $scope.departments[2],
        phone: '223456789',
        email: 'mail2@mail.ru'
    }];

    $scope.data = {};

    $scope.modes = [{
        value: 'employee',
        text: 'Сотрудники'
    }, {
        value: 'department',
        text: 'Отделы'
    }, {
        value: 'position',
        text: 'Должности'
    }];

    $scope.search = {};
    $scope.selected = $scope.departments[0];

    $scope.getSearch = function () {
        if ($scope.data.mode !== undefined) {
            return 'src/search/search.html';
        }
    };

    $scope.getContent = function () {
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
        var mode = $scope.data.mode;
        console.log(mode);
        var card = angular.element('<card-directive mode="' + mode + '"></card-directive>');
        console.log(card);
        var content = angular.element(document.querySelector('.content'));
        console.log(content);
        content.append(card);
        $compile(card)($scope);
    };

    $scope.data = {};
    $scope.changingNeeded = function (employee) {
        var mode = $scope.data.mode;
        console.log(employee);
        var card = angular.element('<employee-card-directive>');
        var content = angular.element(document.querySelector('.content'));
        content.append(card);
        $compile(card)($scope);
    };
});
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
            scope.emp = JSON.parse(scope.data.checked);
            $('#phone').mask('+7(999)999-9999');
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

app.filter('formatText', function () {
    return function (text, searchedFor) {
        return text.contains(searchedFor);
    };
});