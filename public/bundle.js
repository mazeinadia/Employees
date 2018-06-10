"use strict";

var app = angular.module("app", []);

var log = console.log;
'use strict';

function appController(scope, storage, q) {
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
    ctrl.loading = false;

    ctrl.getTestData = function () {
        /*ctrl.loading = true;
        new Promise(function (resolve, reject) {
            setTimeout(resolve(), 1);
        }).then(() => {
            ctrl.data = {};
            storage.setTestData();
            ctrl.modes.forEach((mode) => {
                ctrl.data[mode.value + 's'] = (storage.getAllEntitiesOneType(mode.value));
            });
            ctrl.data = JSON.stringify(ctrl.data);
            log('app');
        }).then(() => {
            ctrl.loading = false;
        });*/
        ctrl.data = {};
        storage.setTestData();
        ctrl.modes.forEach(function (mode) {
            ctrl.data[mode.value + 's'] = storage.getAllEntitiesOneType(mode.value);
        });
        ctrl.data = JSON.stringify(ctrl.data);
        log('app');
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
    controller: ['$scope', 'storage', '$q', appController]
});
'use strict';

app.directive('card', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            mode: '@',
            entity: '=',
            data: '@'
        },
        link: function link(scope, element, attrs) {
            scope.$watch('mode', function (newMode) {
                var card = void 0;
                switch (scope.mode) {
                    case 'employee':
                        if (scope.data) {
                            scope.data = JSON.parse(scope.data);
                            scope.departments = scope.data.departments;
                            scope.departments.push({ name: '' });
                            scope.positions = scope.data.positions;
                            if (scope.entity) {
                                scope.employee = JSON.parse(scope.entity);
                            }
                            card = angular.element('<employee-card id="card" mode="mode"' + 'data="employee" departments="departments" positions="positions">');
                        } else {
                            card = angular.element('<employee-card id="card">');
                        }
                        break;
                    case 'department':
                        if (scope.data) {
                            scope.data = JSON.parse(scope.data);
                            scope.departments = scope.data.departments;
                            scope.departments.push({ name: '' });
                            card = angular.element('<department-card id="card" data="entity" departments="departments">');
                        } else {
                            card = angular.element('<department-card id="card">');
                        }
                        break;
                    case 'position':
                        if (scope.entity) {
                            scope.position = JSON.parse(scope.entity);
                        }
                        card = angular.element('<position-card id="card" data="position">');
                }
                element.replaceWith(card);
                $compile(card)(scope);
            });
        }
    };
});
'use strict';

app.directive('closeCard', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            closeCard: '@'
        },
        link: function link(scope, elment, attributes) {
            scope.$watch('closeCard', function (value) {
                if (value === 'true') {
                    var content = angular.element(document.getElementById('card'));
                    var card = angular.element('<div id="card"></div>');
                    content.replaceWith(card);
                    $compile(card)(scope);
                }
            });
        }
    };
});
'use strict';

app.directive('addEntity', function ($compile) {
    return {
        restrict: 'E',
        template: '<input type="submit" value="+" class="button" id="addEntity">',
        link: function link(scope, element, attrs) {
            scope.$watch('mode', function (value) {
                scope.mode = value;
            });
            element.on('click', function () {
                var content = angular.element(document.getElementById('card'));
                var card = angular.element('<card mode="' + scope.mode + '" data="{{data}}">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
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

    ctrl.$onChanges = function (obj) {
        if (obj.data) {
            log('content');
        }
    };

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

function dbController() {
    var ctrl = this;

    ctrl.dataIsLoaded = false;

    ctrl.$onChanges = function (obj) {};

    ctrl.handleLoad = function () {
        ctrl.onLoad();
        log('db load');
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

function departmentCardController(storage, $timeout) {
    var ctrl = this;

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data) {
            ctrl.toDeleteName = ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.handleSelectedChange = function (text, mode) {
        ctrl.data[mode] = text;
    };

    ctrl.save = function () {
        if (ctrl.isUpdating && ctrl.data.name !== ctrl.toDeleteName) {
            storage.deleteEntity('department' + ctrl.toDeleteName);
        }
        storage.addEntity('department' + ctrl.data.name, ctrl.data);
        var updater = angular.element(document.getElementById('fillDB'));
        $timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
    };
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
        /*if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
        if (changes.entities) {
            log('deps');
            log(ctrl.entities);
        }*/
    };
}

app.component('departmentList', {
    templateUrl: 'src/department/departmentList.html',
    controller: departmentListController,
    bindings: {
        data: '@',
        search: '<',
        entities: '<'
    }
});
'use strict';

app.directive('node', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            data: '@',
            search: '='
        },
        templateUrl: 'src/department/departmentNode.html',
        link: function link(scope, element, attrs) {
            element.find('button').on('click', function () {
                var content = angular.element(document.getElementById('card'));
                scope.entity = { parent: scope.member.name };
                var card = angular.element('<card mode="department" data="{{data}}" entity="entity">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
            element.find('input').on('change', function () {
                var content = angular.element(document.getElementById('card'));
                var card = angular.element('<card mode="department" data="{{data}}" entity="member">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
            if (angular.isArray(scope.member.children)) {
                element.append('<department-list entities="member.children" data="{{data}}" search="search">');
                $compile(element.contents())(scope);
            }
        }
    };
});
'use strict';

function employeeCardController(storage, timeout) {
    var ctrl = this;

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data) {
            ctrl.toDeletePhone = ctrl.data.phone;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.$onChanges = function (changeObj) {
        if (changeObj.data) {
            if (ctrl.data) {
                ctrl.data.date = new Date(ctrl.data.date);
            }
        }
    };
    ctrl.handleSelectedChange = function (text, mode) {
        ctrl.data[mode] = text;
    };

    ctrl.$onPhoneChange = function () {
        if (ctrl.data.phone) {
            var numeric = ctrl.data.phone.replace(/[^\d]/, '').replace(/ /g, '').replace(/\(/g, '').replace(/\)/g, '');
            if (numeric[0] === '8') {
                numeric = numeric.slice(1, numeric.length);
            }
            if (numeric.length > 10) {
                numeric = numeric.slice(0, 10);
            }
            if (numeric.length <= 3) {
                ctrl.data.phone = '8 (' + numeric;
            } else if (numeric.length <= 6) {
                ctrl.data.phone = '8 (' + numeric.slice(0, 3) + ') ' + numeric.slice(3, numeric.length);
            } else {
                ctrl.data.phone = '8 (' + numeric.slice(0, 3) + ') ' + numeric.slice(3, 6) + ' ' + numeric.slice(6, numeric.length);
            }
        }
    };

    ctrl.save = function () {
        if (ctrl.isUpdating && ctrl.data.phone !== ctrl.toDeletePhone) {
            storage.deleteEntity('employee' + ctrl.toDeletePhone);
        }
        var key = 'employee' + ctrl.data.phone;
        storage.addEntity(key, ctrl.data);
        var updater = angular.element(document.getElementById('fillDB'));
        timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
    };
}

app.component('employeeCard', {
    templateUrl: 'src/employee/employeeCard.html',
    controller: ['storage', '$timeout', employeeCardController],
    bindings: {
        data: '<',
        departments: '<',
        positions: '<',
        mode: '='
    }
});
'use strict';

function employeeListController() {
    var ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.entities) {
            log('employee list changed');
        }
    };

    ctrl.handleSelectChange = function (text) {
        ctrl.data.position = '';
        ctrl.data.departments = '';
    };

    ctrl.$onInit = function () {
        log('empl list init!');
    };
}

app.component('employeeList', {
    templateUrl: 'src/employee/employeeList.html',
    controller: employeeListController,
    bindings: {
        data: '@',
        search: '<',
        entities: '<'
    }
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
                    update();
                }
            });

            scope.$watch('data', function (value) {
                if (scope.chosen === 'true') {
                    update();
                }
            });

            function update() {
                log('division -> updt');
                var content = angular.element(document.getElementById('content'));
                var newContent = angular.element('<content id="content" mode="{{division}}" data="{{data}}">');
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

    ctrl.$onInit = function () {
        ctrl.previousData = ctrl.data;
    };

    ctrl.$onChanges = function (obj) {
        log('div list changed, but not data');
        if (obj.data) {
            log('divisionList');
            log(ctrl.data);
        }
    };
}

app.component('divisionList', {
    templateUrl: 'src/divisions/divisionsList.html',
    controller: [divisionListController],
    bindings: {
        data: '@'
    }
});
'use strict';

function loaderController() {
    var ctrl = this;
}

app.component('loader', {
    templateUrl: 'src/loader/loader.html',
    controller: loaderController
});

app.directive('loading', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            loading: '@'
        },
        link: function link(scope, element, attributes) {
            scope.$watch('loading', function (value) {
                if (value === 'true') {
                    //show
                    element.append('<loader>');
                    $compile(element.contents())(scope);
                } else {
                    //hide
                    var child = element.children()[0];
                    if (child) {
                        child.remove();
                        $compile(element.contents())(scope);
                    }
                }
            });
        }
    };
});
'use strict';

function positionCardController(storage, $timeout) {
    var ctrl = this;

    ctrl.$onSalaryChanged = function () {
        if (ctrl.data.salary) {
            //log(ctrl.salary.length);
            if (ctrl.data.salary.length > 3) {
                var formatted = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
                var length = formatted.length;
                log(formatted);
                while (length > 3) {
                    length = length - 3;
                    //log(length);
                    formatted = formatted.slice(0, length) + ' ' + formatted.slice(length);
                }
                ctrl.data.salary = formatted;
            } else {
                ctrl.data.salary = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
            }
        }
    };

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data) {
            ctrl.toDeleteName = ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.save = function () {
        if (ctrl.isUpdating && ctrl.data.name !== ctrl.toDeleteName) {
            storage.deleteEntity('position' + ctrl.toDeleteName);
        }
        storage.addEntity('position' + ctrl.data.name, ctrl.data);
        var updater = angular.element(document.getElementById('fillDB'));
        $timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
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

        var time_ms = new Date().getTime();
        while (new Date().getTime() < time_ms + 3000) {}

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

        //let time_ms = new Date().getTime();
        //while (new Date().getTime() < time_ms + 1000) {}
        if (type === 'department') {
            values = listToTree(values);
        }
        return values;
    };

    return factory;
});

function listToTree(list) {
    var tree = getRange(undefined);

    function getRange(parentName) {
        var range = [];
        var listLen = list.length;
        for (var counter = 0; counter < listLen; counter++) {
            if (list[counter].parent === parentName) {
                var elem = list[counter].name;
                list.splice(counter, 1);
                listLen--;
                range.push({
                    parent: parentName,
                    name: elem,
                    children: getRange(elem)
                });
                listLen = list.length;
                counter--;
            }
        }
        return range;
    }
    return tree;
}
'use strict';

var DEPARTMENTS = [{
    name: 'Маркетинг'
}, {
    name: 'HR'
}, {
    name: 'Планирование',
    parent: 'Маркетинг'
}, {
    name: 'Техническая поддержка',
    parent: 'Корпоративный маркетинг'
}, {
    name: 'Корпоративный маркетинг',
    parent: 'Маркетинг'
}];
var POSITIONS = [{
    name: 'Генеральный директор',
    salary: 250000
}, {
    name: 'HR-менеджер',
    salary: 70000
}, {
    name: 'Маркетолог',
    salary: 70000
}, {
    name: 'Консультант',
    salary: 50000
}];
var EMPLOYEES = [{
    name: 'Пертов Перт Петрович',
    date: '2018-03-01',
    position: 'HR-менеджер',
    department: 'HR',
    phone: '8 (998) 898 9898',
    email: 'mail@mail.ru'
}, {
    name: 'Иванов Иван Иванович',
    date: '2018-03-01',
    position: 'Консультант',
    department: 'Техническая поддержка',
    phone: '8 (908) 898 9898',
    email: 'mail3@mail.ru'
}, {
    name: 'Кошкин Константин Константинович',
    date: '2018-03-01',
    position: 'Генеральный директор',
    department: '',
    phone: '8 (918) 898 9898',
    email: 'mail2@mail.ru'
}];
'use strict';

app.component('pencil', {
    templateUrl: 'src/card/pencil/pencil.html'
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
    };

    ctrl.$onChanges = function () {};

    ctrl.showOptions = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible;
    };

    ctrl.handleChoose = function (value) {
        ctrl.selectText = value;
        ctrl.selected = value;
        ctrl.onSelectedChange({ text: value });
    };

    ctrl.handleTreeClick = function () {
        ctrl.visibility.optionsVisible = !ctrl.visibility.optionsVisible;
    };
}

app.component('searchSelect', {
    templateUrl: 'src/card/searchSelect/searchSelect.html',
    controller: searchSelectController,
    bindings: {
        options: '<',
        selected: '@',
        className: '@',
        onSelectedChange: '&'
    }
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

app.directive('changeEntity', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            mode: '@',
            changeEntity: '@',
            data: '@'
        },
        link: function link(scope, element, attributes) {
            scope.$watch('mode', function (value) {
                scope.mode = value;
            });
            element.on('click', function () {
                var content = angular.element(document.getElementById('card'));
                var card = angular.element('<card mode="' + scope.mode + '" data="{{data}}" entity="changeEntity">');
                content.replaceWith(card);
                $compile(card)(scope);
            });
        }
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

function listController() {
    var ctrl = this;

    ctrl.$onChanges = function (obj) {
        if (obj.data) {
            log('list');
        }
    };
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
                var data = angular.copy(JSON.parse(scope.data));
                log('list derictive');
                log('mode: ' + scope.mode);
                switch (scope.mode) {
                    case 'employee':
                        scope.employees = data.employees;
                        list = angular.element('<employee-list entities="employees" search="search" data="{{data}}">');
                        break;
                    case 'department':
                        scope.departments = data.departments;
                        list = angular.element('<department-list entities="departments" search="search" data="{{data}}">');
                        break;
                    case 'position':
                        scope.positions = data.positions;
                        list = angular.element('<position-list data="positions" search="search">');
                }
                element.replaceWith(list);
                $compile(list)(scope);
            }
        }
    };
});
'use strict';

function optionsController() {
    var ctrl = this;

    ctrl.$onChanges = function (changes) {};
}

app.component('options', {
    templateUrl: 'src/card/searchSelect/options/options.html',
    controller: optionsController,
    bindings: {
        data: '<',
        search: '@'
    }
});
'use strict';

app.directive('treeNode', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            member: '=',
            search: '=',
            className: '@',
            onChoose: '&'
        },
        templateUrl: 'src/content/list/tree/node.html',
        link: function link(scope, element, attrs) {
            if (angular.isArray(scope.member.children)) {
                element.append('<tree data="member.children" search="search" class-name="{{className}}">');
                $compile(element.contents())(scope);
            }
            element.on('click', function (event) {
                //choose & close
                scope.onChoose({ value: event.target.id });
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
        className: '@',
        onChoose: '&'
    }
});