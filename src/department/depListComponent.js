function departmentListController() {
    let ctrl = this;
    ctrl.search = {}
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