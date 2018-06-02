function employeeCardController (storage) {
    let ctrl = this;

    ctrl.$onInit = function () {
        $('#phone').mask('+7(999)999-9999');
        if (ctrl.data){
            log('INIT : UPDATE');
            ctrl.toDelete = 'employee' + ctrl.data.name;
            log(ctrl.toDelete);
            ctrl.isUpdating = true;
        } else {
            log('INIT : ADD');
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
            log('i am delete' + ctrl.toDelete);
            storage.deleteEntity(ctrl.toDelete)
        }
        storage.addEntity('employee' + ctrl.data.name, ctrl.data);
        log(storage.getAllEntitiesOneType('employee'));
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