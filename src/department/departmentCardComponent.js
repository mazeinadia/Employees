function departmentCardController (storage, $timeout) {
    let ctrl = this;

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data){
            ctrl.toDeleteName = ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.handleSelectedChange = function(text) {
        ctrl.data['parent'] = text
    };

    ctrl.save = function() {
        if(ctrl.isUpdating && ctrl.data.name !== ctrl.toDeleteName){
            storage.deleteEntity('department' + ctrl.toDeleteName)
        }
        storage.addEntity('department' + ctrl.data.name, ctrl.data);
        let updater = angular.element(document.getElementById('fillDB'));
        $timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
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