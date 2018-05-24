function positionListController() {
    let ctrl = this;
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