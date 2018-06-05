function employeeListController() {
    let ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
    };
    
    ctrl.handleSelectChange = function (text) {
        ctrl.data.position = '';
        ctrl.data.departments = '';
    }
}

app.component('employeeList', {
    templateUrl: 'src/employee/employeeList.html',
    controller: employeeListController,
    bindings: {
        data: '@',
        search: '<',
        entities: '<'
    }
});