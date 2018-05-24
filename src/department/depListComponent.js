function departmentListController() {
    let ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
    };

}

app.component('departmentList', {
    templateUrl: 'src/department/departmentList.html',
    controller: departmentListController,
    bindings: {
        data: '<',
        search: '<'
    }
});