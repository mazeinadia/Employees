function departmentCardController () {
    let ctrl = this;

    ctrl.$onInit = function () {
        if (ctrl.data){
            ctrl.toDelete = 'department' + ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.save = function() {
        if(ctrl.isUpdating){
            storage.deleteEntity(ctrl.toDelete)
        }
        storage.addEntity('department' + ctrl.data.name, ctrl.data);
    }
}

app.component('departmentCard', {
    templateUrl: 'src/department/departmentCard.html',
    controller: departmentCardController,
    bindings: {
        data: '<',
        departments: '<'
    }
});