function dbController() {
    let ctrl = this;

    ctrl.dataIsLoaded = false;

    ctrl.handleLoad = function () {
        if(!ctrl.dataIsLoaded) {
            ctrl.onLoad();
            ctrl.dataIsLoaded = true;
        }
    };

    ctrl.handleClear = function () {
        if (ctrl.dataIsLoaded) {
            ctrl.onClear();
            ctrl.dataIsLoaded = false;
        }
    };
}

app.component('db', {
    templateUrl: 'src/db/db.html',
    controller: dbController,
    bindings: {
        onLoad: '&',
        onClear: '&'
    }
});