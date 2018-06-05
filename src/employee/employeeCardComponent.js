function employeeCardController (storage) {
    let ctrl = this;

    ctrl.$onInit = function () {
        $('#phone').mask('+7(999)999-9999');
        if (ctrl.data){
            ctrl.toDelete = 'employee' + ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.$onChanges = function(changeObj) {
        if (changeObj.data){
            if (ctrl.data){
                ctrl.data.date = new Date(ctrl.data.date);
            }
        }
    };

    ctrl.save = function() {
        if(ctrl.isUpdating){
            storage.deleteEntity(ctrl.toDelete)
        }
        storage.addEntity('employee' + ctrl.data.name, ctrl.data);
    }
}

app.component('employeeCard', {
    templateUrl: 'src/employee/employeeCard.html',
    controller: ['storage', employeeCardController],
    bindings: {
        data: '<',
        departments: '<',
        positions: '<'
    }
});