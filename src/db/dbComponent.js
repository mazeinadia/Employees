function dbController(scope, storage) {
    let ctrl = this;

    scope.data = scope.$parent.data;

    ctrl.setTestData = function () {
        storage.setTestData();
        scope.data.modes.forEach((mode) => {
            scope.data[mode.value+'s'] = (storage.getAllEntitiesOneType(mode.value));
        });
        log(scope.data.departments);
        alert('БД заполнена тестовыми данными')
    };

    ctrl.clearDB = function () {
        storage.clear();
        alert('БД очищена')
    };
}

app.component('db', {
    templateUrl: 'src/db/db.html',
    controller: ['$scope', 'storage', dbController]
});