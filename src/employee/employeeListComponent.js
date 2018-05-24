function employeeListController() {
    let ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.search) {
            log('CHANGE search for ' + this.search);
            log(changes.search['name']);
        }
    };

}

app.component('employeeList', {
    templateUrl: 'src/employee/employeeList.html',
    controller: employeeListController,
    bindings: {
        data: '<',
        search: '<'
    }
});