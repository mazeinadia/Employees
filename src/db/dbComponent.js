function dbController() {
    let ctrl = this;

    ctrl.dataIsLoaded = false;

    ctrl.$onChanges = function(obj){

    };

    ctrl.handleLoad = function () {
        ctrl.onLoad();
        log('db load');
    };

    ctrl.handleClear = function () {
        if (ctrl.dataIsLoaded) {
            ctrl.onClear();
            ctrl.dataIsLoaded = false;
            alert('БД очищена')
        } else {
            alert('БД уже была очищена')
        }
    };
}

app.component('db', {
    templateUrl: 'src/db/db.html',
    controller: dbController,
    bindings: {
        onLoad: '&',
        onClear: '&'//,
        //modes: '<'
    }
});