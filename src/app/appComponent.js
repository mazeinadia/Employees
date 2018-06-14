function appController(storage, $window) {
    let ctrl = this;

    ctrl.data = '';
    ctrl.modes = [
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
    ctrl.loading = false;

    ctrl.getTestData = function() {
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
        ctrl.modes.forEach((mode) => {
            ctrl.data[mode.value + 's'] = (storage.getAllEntitiesOneType(mode.value));
        });
        ctrl.data = JSON.stringify(ctrl.data);
    };

    ctrl.clearDB = function () {
        storage.clear();
        ctrl.data = '';
    };

    ctrl.setMode = function(mode) {
        ctrl.mode = mode
    };

    ctrl.$onInit = function () {
        ctrl.divisionStyle = 'divisions';

    };

    ctrl.menuClicked = function () {
        //change division-list class
        if (ctrl.divisionClass === 'divisions') {
            ctrl.divisionClass = 'divisions_drop-down'
        } else {
            ctrl.divisionClass = 'divisions'
        }
    };

    ctrl.hide = function() {
        if (ctrl.divisionClass === 'divisions_drop-down') {
            ctrl.divisionClass = 'divisions'
        }
    }
}

app.component('appComponent', {
    templateUrl: 'src/app/app.html',
    controller: appController
});