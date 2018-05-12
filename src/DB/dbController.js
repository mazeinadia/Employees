app.controller('dbController', ['$scope', 'storage', function (scope, storage) {
    scope.setTestData = function () {
        storage.setTestData();
        scope.data.modes.forEach((mode) => {
            scope.data[mode.value+'s'] = (storage.getAllEntitiesOneType(mode.value));
        });
        alert('БД заполнена тестовыми данными')
    };

    scope.clearDB = function () {
        storage.clear();
        alert('БД очищена')
    };
}]);