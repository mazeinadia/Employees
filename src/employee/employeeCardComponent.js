function employeeCardController () {
    let ctrl = this;

    ctrl.$onInit = function () {
        $('#phone').mask('+7(999)999-9999');

    };

    ctrl.$onChanges = function() {
        log(ctrl.departments);
    }
}

app.component('employeeCard', {
    templateUrl: 'src/employee/employeeCard.html',
    controller: employeeCardController,
    bindings: {
        data: '<',
        departments: '<',
        positions: '<'
    }
});