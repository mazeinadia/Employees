"use strict";

var app = angular.module("app", []);

var log = console.log;
'use strict';

function appController(scope, storage) {
    var ctrl = this;

    ctrl.data = '';
    ctrl.modes = [{
        value: 'employee',
        text: 'Сотрудники'
    }, {
        value: 'department',
        text: 'Отделы'
    }, {
        value: 'position',
        text: 'Должности'
    }];
    ctrl.getTestData = function () {
        ctrl.data = {};
        storage.setTestData();
        ctrl.modes.forEach(function (mode) {
            ctrl.data[mode.value + 's'] = storage.getAllEntitiesOneType(mode.value);
        });
        ctrl.data = JSON.stringify(ctrl.data);
    };

    ctrl.clearDB = function () {
        storage.clear();
        ctrl.data = '';
    };

    ctrl.setMode = function (mode) {
        ctrl.mode = mode;
    };
}

app.component('appComponent', {
    templateUrl: 'src/app/app.html',
    controller: ['$scope', 'storage', appController]
});
'use strict';

app.directive('card', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            data: '@'
        },
        link: function link(scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                log(newMode);
            });
            var card = void 0,
                data = void 0;
            switch (scope.mode) {
                case 'employee':
                    if (scope.data) {
                        scope.data = JSON.parse(scope.data);
                        scope.departments = scope.data.departments;
                        scope.departments.push({ name: '' });
                        scope.positions = scope.data.positions;
                        card = angular.element('<employee-card positions="positions" departments="departments">');
                    } else {
                        card = angular.element('<employee-card id="card">');
                    }
                    break;
                case 'department':
                    if (scope.data) {
                        data = JSON.parse(scope.data);
                        scope.departments = data.departments;
                        scope.departments.push({ name: '' });
                        card = angular.element('<department-card id="card" departments="departments">');
                    } else {
                        card = angular.element('<department-card id="card">');
                    }
                    break;
                case 'position':
                    card = angular.element('<position-card id="card">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    };
});
'use strict';

app.directive('entity', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            entity: '=' //'@'
        },
        link: function link() {
            scope.$watch('mode', function (newMode) {
                log(newMode);
            });
            var card = void 0;
            log('in card link');
            switch (scope.mode) {
                case 'employee':
                    card = angular.element('<employee-card id="card" data="entity">');
                    break;
                case 'department':
                    card = angular.element('<department-card id="card" data="entity">');
                    break;
                case 'position':
                    card = angular.element('<position-card id="card" data="entity">');
            }
            element.replaceWith(card);
            $compile(card)(scope);
        }
    };
});
'use strict';

function optionsController() {
    var ctrl = this;

    ctrl.$onChanges = function (changes) {};
}

app.component('options', {
    templateUrl: 'src/card/options.html',
    controller: optionsController,
    bindings: {
        data: '<',
        search: '@'
    }
});
'use strict';

function searchSelectController() {
    var ctrl = this;

    ctrl.searchChange = function (text) {
        ctrl.searchText = { name: text };
    };

    ctrl.$onInit = function () {
        ctrl.selectText = ctrl.selected;
        ctrl.visibility = {};
        ctrl.visibility.optionsVisible = false;
        /*let searchBlock = angular.element(document.getElementsByClassName('search-select'));
        log(searchBlock);
          angular.element(document.getElementsByTagName('body')).on('click', function (event) {
            log(event.target);
            if(searchBlock.indexOf(event.target) !== -1) {
                ctrl.optionsVisible = false;
            }
        });*/
    };

    ctrl.$onChanges = function () {
        log('in search select options: ' + this.options);
    };

    ctrl.showOptions = function () {
        log('work');
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible;
    };

    ctrl.handleChoose = function (value) {
        ctrl.selectText = value;
        //ctrl.visibility.optionsVisible = false;
        //log('in search-select clicked ' + value);
        //ctrl.showOptions();
        log('in search-select selected ' + ctrl.selectText + ctrl.visibility.optionsVisible);
    };

    ctrl.handleTreeClick = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible;
        log('TREE');
    };
}

app.component('searchSelect', {
    templateUrl: 'src/card/searchSelect.html',
    controller: searchSelectController,
    bindings: {
        options: '<',
        selected: '@'
    }
});
'use strict';

app.directive('addEntity', function ($compile) {
    return {
        restrict: 'E',
        template: '<input type="submit" value="+" class="button" id="addEntity">',
        link: function link(scope, element, attrs) {
            log('in add entity' + scope.mode);
            scope.$watch('mode', function (value) {
                log('in add entity mode changed to ' + value);
                scope.mode = value;
            });
            element.on('click', function () {
                log('add card button clicked');
                var content = angular.element(document.getElementById('card'));
                var card = angular.element('<card mode="' + scope.mode + '" data="{{data}}">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
            //$compile(content.contents())(scope)
        },
        scope: {
            mode: '@',
            data: '@'
        }
    };
});
'use strict';

function contentController() {
    var ctrl = this;

    ctrl.setSearchText = function (text) {
        ctrl.search = { name: text };
        log('CONTENT search for ' + text);
    };
}

app.component('content', {
    templateUrl: 'src/content/content.html',
    controller: contentController,
    bindings: {
        mode: '@',
        data: '@'
    }
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

function dbController() {
    var ctrl = this;

    ctrl.dataIsLoaded = false;

    ctrl.handleLoad = function () {
        if (!ctrl.dataIsLoaded) {

            ctrl.onLoad();
            ctrl.dataIsLoaded = true;
            alert('БД заполнена тестовыми данными');
        } else {
            alert('БД уже была заполнена тестовыми данными');
        }
    };

    ctrl.handleClear = function () {
        if (ctrl.dataIsLoaded) {
            ctrl.onClear();
            ctrl.dataIsLoaded = false;
            alert('БД очищена');
        } else {
            alert('БД уже была очищена');
        }
    };
}

app.component('db', {
    templateUrl: 'src/db/db.html',
    controller: dbController,
    bindings: {
        onLoad: '&',
        onClear: '&' //,
        //modes: '<'
    }
});
'use strict';

function departmentCardController() {
    var ctrl = this;
}

app.component('departmentCard', {
    templateUrl: 'src/department/departmentCard.html',
    controller: departmentCardController,
    bindings: {
        data: '<',
        departments: '<'
    }
});
'use strict';

function departmentListController() {
    var ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
    };
}

app.component('departmentList', {
    templateUrl: 'src/department/departmentList.html',
    controller: departmentListController,
    bindings: {
        data: '<',
        search: '<'
    }
});
'use strict';

app.directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '='
        },
        templateUrl: 'src/department/departmentNode.html',
        link: function link(scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                element.append('<department-list data="member.children">');
                $compile(element.contents())(scope);
            }
        }
    };
});
'use strict';

app.directive('division', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            chosen: '@',
            division: '@',
            data: '@'
        },
        link: function link(scope, element, attrs) {
            scope.$watch('chosen', function (value, old) {
                if (value === 'true') {
                    updateMode();
                }
            }, true);
            var mode = void 0,
                data = void 0;
            scope.$watch('division', function (value) {
                mode = value;
            });
            scope.$watch('data', function (value) {
                data = value;
            });

            function updateMode() {
                var content = angular.element(document.getElementById('content'));
                var newContent = angular.element("<content id='content' mode='" + mode + "' data='" + data + "'>");
                content.replaceWith(newContent);
                $compile(newContent)(scope);
            }
        }
    };
});
'use strict';

function divisionListController() {
    var ctrl = this;

    ctrl.modes = [{
        value: 'employee',
        text: 'Сотрудники'
    }, {
        value: 'department',
        text: 'Отделы'
    }, {
        value: 'position',
        text: 'Должности'
    }];
    ctrl.isChosen = function (value) {
        return value === ctrl.division;
    };
    /*ctrl.$onChanges = function() {
        log(ctrl.data);
    }*/
}

app.component('divisionList', {
    templateUrl: 'src/divisions/divisionsList.html',
    controller: [divisionListController],
    bindings: {
        data: '@'
    }
});
'use strict';

function employeeCardController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        $('#phone').mask('+7(999)999-9999');
    };

    ctrl.$onChanges = function () {
        log(ctrl.departments);
    };
}

app.component('employeeCard', {
    templateUrl: 'src/employee/employeeCard.html',
    controller: employeeCardController,
    bindings: {
        data: '<',
        departments: '<',
        positions: '<'
    }
});
'use strict';

app.directive('employeeCardDirective', function () {
    return {
        restrict: 'E',
        link: function link(scope) {
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

function employeeListController() {
    var ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
    };
}

app.component('employeeList', {
    templateUrl: 'src/employee/employeeList.html',
    controller: employeeListController,
    bindings: {
        data: '<',
        search: '<'
    }
});
'use strict';

function positionCardController() {
    var ctrl = this;

    ctrl.$onSalaryChanged = function () {
        if (ctrl.salary) {
            //log(ctrl.salary.length);
            if (ctrl.salary.length > 3) {
                var formatted = ctrl.salary.replace(/[^\d]/, '').replace(/ /g, '');
                var length = formatted.length;
                log(formatted);
                while (length > 3) {
                    length = length - 3;
                    //log(length);
                    formatted = formatted.slice(0, length) + ' ' + formatted.slice(length);
                }
                ctrl.salary = formatted;
            } else {
                ctrl.salary = ctrl.salary.replace(/[^\d]/, '').replace(/ /g, '');
            }
        }
    };
}

app.component('positionCard', {
    templateUrl: 'src/position/positionCard.html',
    controller: positionCardController,
    bindings: {
        data: '<'
    }
});
'use strict';

function positionListController() {
    var ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
    };
}

app.component('positionList', {
    templateUrl: 'src/position/positionList.html',
    controller: positionListController,
    bindings: {
        data: '<',
        search: '<'
    }
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
    name: 'Отдел1',
    children: [{
        name: 'Отдел1.1',
        children: [{
            name: 'Отдел1.1.1'
        }]
    }, {
        name: 'Отдел1.2'
    }]
}, {
    name: 'Отдел2'
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
'use strict';

function listController() {
    var ctrl = this;
}

app.component('list', {
    templateUrl: 'src/content/list/list.html',
    controller: listController,
    bindings: {
        mode: '@',
        data: '@',
        search: '<'
    }
});
'use strict';

app.directive('chooseList', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            data: '@',
            search: '<'
        },
        link: function link(scope, element, attrs) {
            var list = void 0;
            if (scope.data) {
                scope.data = JSON.parse(scope.data);

                switch (scope.mode) {
                    case 'employee':
                        scope.employees = scope.data.employees;
                        list = angular.element('<employee-list data="employees" search="search">');
                        break;
                    case 'department':
                        scope.departments = scope.data.departments;
                        list = angular.element('<department-list data="departments" search="search">');
                        break;
                    case 'position':
                        scope.positions = scope.data.positions;
                        list = angular.element('<position-list data="positions" search="search">');
                }

                element.replaceWith(list);
                $compile(list)(scope);
            }
        }
    };
});
'use strict';

function searchController() {
    var ctrl = this;

    ctrl.handleTextChange = function () {
        ctrl.onTextChange({ text: ctrl.text });
    };
}

app.component('search', {
    bindings: {
        onTextChange: '&'
    },
    templateUrl: 'src/content/search/search.html',
    controller: searchController
});
'use strict';

app.directive('treeNode', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            search: '=',
            class: '@',
            onChoose: '&'
        },
        templateUrl: 'src/content/list/tree/node.html',
        link: function link(scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                element.append('<tree data="member.children" search="search" class="{{class}}">');
                $compile(element.contents())(scope);
            }
            element.on('click', function (event) {
                //choose & close
                scope.onChoose({ value: event.target.id });
                log('in node directive clicked ' + event.target.id);
            });
        }
    };
});
'use strict';

function treeController() {
    var ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {};

    ctrl.handleChoose = function (value) {
        ctrl.onChoose({ value: value });
    };
}

app.component('tree', {
    templateUrl: 'src/content/list/tree/tree.html',
    controller: treeController,
    bindings: {
        data: '<',
        search: '<',
        class: '@',
        onChoose: '&'
    }
});