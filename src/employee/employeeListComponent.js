function employeeListController() {
    let ctrl = this;
    ctrl.search = {};

    ctrl.$onChanges = function (changes) {
        if (changes.entities) {
            log('employee list changed')
        }
    };
    
    ctrl.handleSelectChange = function (text) {
        ctrl.data.position = '';
        ctrl.data.departments = '';
    };

    ctrl.$onInit = function () {
        log('empl list init!');
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