function appController(scope, storage) {
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
    ctrl.getTestData = function() {
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
        ctrl.mode = mode;
    }
}

app.component('appComponent', {
    templateUrl: 'src/app/app.html',
    controller: ['$scope', 'storage', appController]
});