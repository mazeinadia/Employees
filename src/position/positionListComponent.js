function positionListController() {
    let ctrl = this;
    ctrl.search = {}
}

app.component('positionList', {
    templateUrl: 'src/position/positionList.html',
    controller: positionListController,
    bindings: {
        data: '<',
        search: '<'
    }
});