function positionCardController (storage, $timeout) {
    let ctrl = this;

    ctrl.$onSalaryChanged = function () {
        if (ctrl.data.salary) {
            //log(ctrl.salary.length);
            if (ctrl.data.salary.length > 3) {
                let formatted = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
                let length = formatted.length;
                log(formatted);
                while (length > 3) {
                    length = length - 3;
                    //log(length);
                    formatted = formatted.slice(0, length) + ' ' + formatted.slice(length);
                }
                ctrl.data.salary = formatted;
            } else {
                ctrl.data.salary = ctrl.data.salary.replace(/[^\d]/, '').replace(/ /g, '');
            }
        }
    };

    ctrl.$onInit = function () {
        ctrl.closing = 'false';
        if (ctrl.data){
            ctrl.toDeleteName = ctrl.data.name;
            ctrl.isUpdating = true;
        } else {
            ctrl.isUpdating = false;
        }
    };

    ctrl.save = function() {
        if(ctrl.isUpdating && ctrl.data.name !== ctrl.toDeleteName){
            storage.deleteEntity('position' + ctrl.toDeleteName)
        }
        storage.addEntity('position' + ctrl.data.name, ctrl.data);
        let updater = angular.element(document.getElementById('fillDB'));
        $timeout(function () {
            updater.triggerHandler("click");
        });
        ctrl.closing = 'true';
    }
}

app.component('positionCard', {
    templateUrl: 'src/position/positionCard.html',
    controller: positionCardController,
    bindings: {
        data: '<'
    }
});