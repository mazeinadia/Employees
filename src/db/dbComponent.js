function dbController() {
    let ctrl = this;

    ctrl.dataIsLoaded = false;


    ctrl.handleLoad = function () {
        if (!ctrl.dataIsLoaded){
            
            ctrl.onLoad();
            ctrl.dataIsLoaded = true;
            alert('БД заполнена тестовыми данными')
        } else {
            alert('БД уже была заполнена тестовыми данными')
        }
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